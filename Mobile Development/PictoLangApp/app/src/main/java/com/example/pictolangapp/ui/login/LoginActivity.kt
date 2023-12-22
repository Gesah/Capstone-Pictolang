package com.example.pictolangapp.ui.login

import android.content.Context
import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import android.widget.*
import androidx.activity.viewModels
import androidx.lifecycle.Observer

import com.example.pictolangapp.R
import com.example.pictolangapp.ui.home.HomeActivity
import com.example.pictolangapp.ui.register.RegisterActivity

class LoginActivity : AppCompatActivity() {
    private lateinit var edEmail: EditText
    private lateinit var edPassword: EditText
    private lateinit var loginButton: Button
    private lateinit var txtRegist: TextView
    private lateinit var progressBar: ProgressBar

    private val viewModel: LoginViewModel by viewModels()

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_login)

        edEmail = findViewById(R.id.edEmail)
        edPassword = findViewById(R.id.edPassword)
        loginButton = findViewById(R.id.loginButton)
        txtRegist = findViewById(R.id.txtRegist)
        progressBar = findViewById(R.id.progressBar)

        val registerLink = findViewById<TextView>(R.id.registerLink)
        registerLink.setOnClickListener {
            val intent = Intent(this@LoginActivity, RegisterActivity::class.java)
            startActivity(intent)
        }

        loginButton.setOnClickListener {
            val email = edEmail.text.toString()
            val password = edPassword.text.toString()

            if (email.isNotEmpty() && password.isNotEmpty()) {
                showProgressBar(true) // Show progress bar

                viewModel.loginUser(email, password)
            } else {
                Toast.makeText(this, "Email dan password harus diisi", Toast.LENGTH_SHORT).show()
            }
        }

        viewModel.loginResult.observe(this, Observer { success ->
            showProgressBar(false) // Hide progress bar

            if (success) {
                Toast.makeText(this, "Login successful!", Toast.LENGTH_SHORT).show()
                val sharedPreferences = getSharedPreferences("user_info", Context.MODE_PRIVATE)
                val editor = sharedPreferences.edit()
                editor.putBoolean("is_logged_in", true)
                editor.apply()

                val intent = Intent(this, HomeActivity::class.java)
                startActivity(intent)
                finish()
            } else {
                Toast.makeText(this, "Authentication failed.", Toast.LENGTH_SHORT).show()
            }
        })

        txtRegist.setOnClickListener {
            val intent = Intent(this, RegisterActivity::class.java)
            startActivity(intent)
        }
    }

    private fun showProgressBar(show: Boolean) {
        if (show) {
            progressBar.visibility = View.VISIBLE
        } else {
            progressBar.visibility = View.INVISIBLE
        }
    }
}