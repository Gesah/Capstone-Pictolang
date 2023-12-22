package com.example.pictolangapp.ui.register

import android.net.Uri
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.example.pictolangapp.data.remote.firebasemanager.FirebaseManager
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.storage.FirebaseStorage

class RegisterViewModel : ViewModel() {

    private val auth = FirebaseAuth.getInstance()
    private val storage = FirebaseStorage.getInstance()

    private var selectedImageUri: Uri? = null

    val registrationResult = MutableLiveData<Boolean>()

    fun registerUser(nama: String, email: String, password: String, selectedImageUri: Uri?) {
        auth.createUserWithEmailAndPassword(email, password)
            .addOnCompleteListener { task ->
                if (task.isSuccessful) {
                    val user = auth.currentUser
                    val userId = user?.uid ?: ""

                    if (selectedImageUri != null) {
                        uploadPhoto(userId, selectedImageUri, nama, email, password)
                    } else {
                        saveUserData(userId, nama, email, password, "")
                    }
                } else {
                    registrationResult.value = false
                }
            }
    }

    fun getSelectedImageUri(): Uri? {
        return selectedImageUri
    }


    private fun uploadPhoto(userId: String, selectedImageUri: Uri, nama: String, email: String, password: String) {
        val photoRef = storage.reference.child("user_photos").child("$userId.jpg")
        photoRef.putFile(selectedImageUri)
            .addOnSuccessListener {
                photoRef.downloadUrl.addOnSuccessListener { downloadUri ->
                    saveUserData(userId, nama, email, password, downloadUri.toString())
                }
            }
            .addOnFailureListener {
                registrationResult.value = false
            }
    }

    private fun saveUserData(userId: String, nama: String, email: String, password: String, photoUrl: String) {
        val userMap = HashMap<String, Any>()
        userMap["name"] = nama
        userMap["email"] = email
        userMap["password"] = password
        userMap["photoUrl"] = photoUrl

        val usersReference = FirebaseManager.getUsersReference()
        usersReference.child(userId).setValue(userMap)
            .addOnCompleteListener { dbTask ->
                registrationResult.value = dbTask.isSuccessful
            }
    }
}

