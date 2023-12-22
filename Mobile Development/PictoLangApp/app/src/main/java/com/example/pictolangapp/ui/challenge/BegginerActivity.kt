package com.example.pictolangapp.ui.challenge

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.cardview.widget.CardView
import com.example.pictolangapp.R
import com.example.pictolangapp.ui.challenge.modul.ModulActivity
import com.example.pictolangapp.ui.challenge.quiz.QuizActivity

class BegginerActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_begginer)

        val cardModul: CardView = findViewById(R.id.cardModul)
        val cardQuiz: CardView = findViewById(R.id.cardQuiz)

        cardModul.setOnClickListener {
            val intent = Intent(this@BegginerActivity, ModulActivity::class.java)
            startActivity(intent)
        }

        cardQuiz.setOnClickListener {
            val intent = Intent(this@BegginerActivity, QuizActivity::class.java)
            startActivity(intent)
        }


    }
}