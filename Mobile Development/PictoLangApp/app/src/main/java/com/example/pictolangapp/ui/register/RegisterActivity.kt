package com.example.pictolangapp.ui.register

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.Button
import android.widget.Toast
import androidx.activity.result.contract.ActivityResultContracts
import androidx.activity.viewModels
import androidx.lifecycle.Observer
import com.example.pictolangapp.R
import com.example.pictolangapp.databinding.ActivityRegisterBinding
import com.example.pictolangapp.ui.login.LoginActivity

class RegisterActivity : AppCompatActivity() {

    private lateinit var binding: ActivityRegisterBinding
    private val viewModel: RegisterViewModel by viewModels()

    private val galleryLauncher =
        registerForActivityResult(ActivityResultContracts.GetContent()) { uri: Uri? ->
            uri?.let {
                binding.etPhoto.setImageURI(it)
                viewModel.registerUser(
                    binding.edNama.text.toString(),
                    binding.edEmail.text.toString(),
                    binding.edPassword.text.toString(),
                    it
                )
            }
        }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityRegisterBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
    }

    private fun setupUI() {

        binding.btnGallery.setOnClickListener {
            galleryLauncher.launch("image/*")
        }

        buttonRegist()
    }

    private fun buttonRegist() {
        binding.btnRegister.setOnClickListener {
            val name = binding.edNama.text.toString()
            val email = binding.edEmail.text.toString()
            val password = binding.edPassword.text.toString()

            // Show progress bar
            binding.progressBar.visibility = View.VISIBLE

            viewModel.registerUser(name, email, password, viewModel.getSelectedImageUri())

            viewModel.registrationResult.observe(this, Observer { success ->
                // Hide progress bar
                binding.progressBar.visibility = View.GONE

                if (success) {
                    Toast.makeText(this, "Registration successful!", Toast.LENGTH_SHORT).show()
                    val intent = Intent(this, LoginActivity::class.java)
                    startActivity(intent)
                    finish()
                }
            })
        }
    }
}