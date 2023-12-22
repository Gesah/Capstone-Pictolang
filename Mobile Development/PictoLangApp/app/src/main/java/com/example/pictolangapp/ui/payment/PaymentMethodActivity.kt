package com.example.pictolangapp.ui.payment

import android.content.Intent
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.cardview.widget.CardView
import com.example.pictolangapp.R

class PaymentMethodActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_payment_method)

        val cvBeginner: CardView = findViewById(R.id.CV_Beginner)
        val cvIntermediate: CardView = findViewById(R.id.CV_Intermediate)
        val cvAdvanced: CardView = findViewById(R.id.CV_Advanced)
        val cvLifetime: CardView = findViewById(R.id.Cbd)

        cvBeginner.setOnClickListener { sendMessage("1 Month: Rp.10.000") }
        cvIntermediate.setOnClickListener { sendMessage("2 Month: Rp.20.000") }
        cvAdvanced.setOnClickListener { sendMessage("12 Month: Rp.50.000") }
        cvLifetime.setOnClickListener { sendMessage("Lifetime: Rp.100.000") }
    }

    private fun sendMessage(message: String) {
        val phoneNumber = "6287763392220"
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/$phoneNumber/?text=$message"))
        startActivity(intent)
    }

}
