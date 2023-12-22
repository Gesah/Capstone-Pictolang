package com.example.pictolangapp.ui.identifikasi

import android.Manifest
import android.content.Intent
import android.content.pm.PackageManager
import android.graphics.Bitmap
import android.graphics.BitmapFactory
import android.media.ThumbnailUtils
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.provider.MediaStore
import android.text.Editable
import android.text.SpannableStringBuilder
import android.widget.ArrayAdapter
import android.widget.Button
import android.widget.EditText
import android.widget.ImageView
import android.widget.TextView
import androidx.annotation.Nullable
import com.example.pictolangapp.R
import com.example.pictolangapp.ml.Model
import com.google.android.material.textfield.MaterialAutoCompleteTextView
import org.tensorflow.lite.DataType
import org.tensorflow.lite.support.tensorbuffer.TensorBuffer
import java.nio.ByteBuffer
import java.nio.ByteOrder

fun String.toEditable(): Editable = SpannableStringBuilder(this)

class IdentifikasiActivity : AppCompatActivity() {
    private lateinit var result: EditText
    private lateinit var imageView: ImageView
    private lateinit var camera: Button
    private lateinit var gallery: Button

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_identifikasi)

        result = findViewById(R.id.result)
        result.isEnabled = false
        imageView = findViewById(R.id.img_detect)
        camera = findViewById(R.id.btnCamera)
        gallery = findViewById(R.id.btnGallery)

        setupDetect()

    }

    private fun setupDetect(){
        camera.setOnClickListener {
            // Launch camera if we have permission
            if (checkSelfPermission(Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                val cameraIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
                startActivityForResult(cameraIntent, 1)
            } else {
                // Request camera permission if we don't have it.
                requestPermissions(arrayOf(Manifest.permission.CAMERA), 100)
            }
        }

        gallery.setOnClickListener {
            // Check and request permission to access external storage if needed
            if (checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) == PackageManager.PERMISSION_GRANTED) {
                // Launch gallery intent
                val galleryIntent = Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI)
                startActivityForResult(galleryIntent, 2)
            } else {
                requestPermissions(arrayOf(Manifest.permission.READ_EXTERNAL_STORAGE), 101)
            }
        }
    }

    private fun classifyImage(image: Bitmap) {
        val model = Model.newInstance(applicationContext)

        // Creates inputs for reference.
        val inputFeature0 = TensorBuffer.createFixedSize(intArrayOf(1, 48, 48, 3), DataType.FLOAT32)
        val byteBuffer = ByteBuffer.allocateDirect(4 * 1 * 48 * 48 * 3) // Sesuaikan ukurannya

        byteBuffer.order(ByteOrder.nativeOrder())

        // get 1D array of 224 * 224 pixels in image
        val intValues = IntArray(48 * 48)
        image.getPixels(intValues, 0, image.width, 0, 0, image.width, image.height)

        // iterate over pixels and extract R, G, and B values. Add to bytebuffer.
        var pixel = 0
        for (i in 0 until 48) { // Adjust the loop bounds based on the tensor shape
            for (j in 0 until 48) {
                val `val` = intValues[pixel++]
                byteBuffer.putFloat(((`val` shr 16 and 0xFF) * (1f / 256f)))
                byteBuffer.putFloat(((`val` shr 8 and 0xFF) * (1f / 256f)))
                byteBuffer.putFloat((`val` and 0xFF) * (1f / 256f))
            }
        }

        inputFeature0.loadBuffer(byteBuffer)

        // Runs model inference and gets result.
        val outputs = model.process(inputFeature0)

        val outputFeature0 = outputs.getOutputFeature0AsTensorBuffer()

        val confidences = outputFeature0.floatArray
        var maxPos = 0
        var maxConfidence = 0f
        for (i in confidences.indices) {
            if (confidences[i] > maxConfidence) {
                maxConfidence = confidences[i]
                maxPos = i
            }
        }
        val classes = arrayOf(
            "Airplane", "Automobile", "Bird", "Cat", "Deer",
            "Dog", "Frog", "Horse", "Ship", "Truck"
        )
        result.text = classes[maxPos].toEditable()


        // Releases model resources if no longer used.
        model.close()

    }

    override fun onActivityResult(requestCode: Int, resultCode: Int, @Nullable data: Intent?) {
        when (requestCode) {
            1 -> {
                // Handling camera result
                if (resultCode == RESULT_OK) {
                    val image = data?.extras?.get("data") as Bitmap
                    val dimension = Math.min(image.width, image.height)
                    val thumbnail = ThumbnailUtils.extractThumbnail(image, dimension, dimension)
                    imageView.setImageBitmap(thumbnail)

                    val scaledImage = Bitmap.createScaledBitmap(thumbnail, 48, 48, false)
                    classifyImage(scaledImage)
                }
            }
            2 -> {
                // Handling gallery result
                if (resultCode == RESULT_OK && data != null) {
                    val selectedImage = data.data
                    val filePathColumn = arrayOf(MediaStore.Images.Media.DATA)
                    val cursor = contentResolver.query(selectedImage!!, filePathColumn, null, null, null)
                    cursor?.moveToFirst()

                    val columnIndex = cursor?.getColumnIndex(filePathColumn[0])
                    val picturePath = cursor?.getString(columnIndex!!)
                    cursor?.close()

                    if (picturePath != null) {
                        val galleryImage = BitmapFactory.decodeFile(picturePath)
                        val dimension = Math.min(galleryImage.width, galleryImage.height)
                        val thumbnail = ThumbnailUtils.extractThumbnail(galleryImage, dimension, dimension)
                        imageView.setImageBitmap(thumbnail)

                        val scaledImage = Bitmap.createScaledBitmap(thumbnail, 48, 48, false)
                        classifyImage(scaledImage)
                    }
                }
            }
        }
        super.onActivityResult(requestCode, resultCode, data)
    }

}