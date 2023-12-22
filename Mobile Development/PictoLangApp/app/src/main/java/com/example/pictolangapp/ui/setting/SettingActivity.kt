package com.example.pictolangapp.ui.setting

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.ArrayAdapter
import android.widget.ListView
import com.example.pictolangapp.R
import com.example.pictolangapp.ui.about.AboutActivity
import com.example.pictolangapp.ui.payment.PaymentMethodActivity
import com.example.pictolangapp.ui.profile.ProfileActivity

class SettingActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_setting)
        val listView: ListView = findViewById(R.id.listView)

        val menuItems = arrayOf("Profile", "Payment", "About")

        val adapter = ArrayAdapter(this,
            android.R.layout.simple_list_item_1, android.R.id.text1, menuItems)

        listView.adapter = adapter

        listView.setOnItemClickListener { parent, view, position, id ->

            when (position) {
                0 -> startActivity(Intent(this, ProfileActivity::class.java))
                1 -> startActivity(Intent(this, PaymentMethodActivity::class.java))
                2 -> startActivity(Intent(this, AboutActivity::class.java))
            }
        }

    }
}