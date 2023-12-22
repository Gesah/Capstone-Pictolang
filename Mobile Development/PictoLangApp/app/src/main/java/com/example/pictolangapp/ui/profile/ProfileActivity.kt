package com.example.pictolangapp.ui.profile

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.EditText
import com.example.pictolangapp.R
import com.google.firebase.auth.FirebaseAuth

class ProfileActivity : AppCompatActivity() {
    lateinit var auth: FirebaseAuth
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val edtName: EditText = findViewById(R.id.edNama)
        val edtEmail: EditText = findViewById(R.id.edEmail)
        val edtPassword: EditText = findViewById(R.id.edPassword)
        auth = FirebaseAuth.getInstance()
        val user = auth.currentUser

        if (user != null) {
            edtName.setText(user.displayName)
            edtEmail.setText(user.email)
            edtPassword
        }
    }
}