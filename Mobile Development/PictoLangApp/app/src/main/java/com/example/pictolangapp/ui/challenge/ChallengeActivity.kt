package com.example.pictolangapp.ui.challenge

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.cardview.widget.CardView
import com.example.pictolangapp.R

class ChallengeActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_challenge)

        val cardBeginner: CardView = findViewById(R.id.CV_Beginner)

        cardBeginner.setOnClickListener {
            val intent = Intent(this@ChallengeActivity, BegginerActivity::class.java)
            startActivity(intent)
        }

    }
}