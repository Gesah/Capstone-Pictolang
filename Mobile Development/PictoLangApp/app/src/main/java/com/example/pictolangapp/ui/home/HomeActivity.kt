package com.example.pictolangapp.ui.home

import android.content.Context
import android.content.Intent
import android.graphics.BitmapFactory
import android.net.Uri
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.MenuItem
import android.view.View
import android.widget.*
import androidx.cardview.widget.CardView
import com.example.pictolangapp.R
import com.example.pictolangapp.databinding.ActivityHomeBinding
import com.example.pictolangapp.ui.about.AboutActivity
import com.example.pictolangapp.ui.challenge.ChallengeActivity
import com.example.pictolangapp.ui.games.GamesActivity
import com.example.pictolangapp.ui.history.HistoryActivity
import com.example.pictolangapp.ui.identifikasi.IdentifikasiActivity
import com.example.pictolangapp.ui.login.LoginActivity
import com.example.pictolangapp.ui.login.LoginViewModel
import com.example.pictolangapp.ui.payment.PaymentMethodActivity
import com.example.pictolangapp.ui.profile.ProfileActivity
import com.example.pictolangapp.ui.setting.SettingActivity
import com.google.android.material.bottomnavigation.BottomNavigationView
import com.google.firebase.auth.FirebaseAuth
import com.google.firebase.database.*
import com.google.firebase.storage.FirebaseStorage
import com.google.firebase.storage.StorageReference
import java.io.File

class HomeActivity : AppCompatActivity() {
    private lateinit var auth: FirebaseAuth

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)

        // Initialize FirebaseAuth
        auth = FirebaseAuth.getInstance()

        val cardIdentifikasi: CardView = findViewById(R.id.cardIdentifikasi)
        val cardChallenge: CardView = findViewById(R.id.cardChallenge)
        val cardGame: CardView = findViewById(R.id.cardGame)
        val cardHistory: CardView = findViewById(R.id.cardHistory)
        val cardPaket: CardView = findViewById(R.id.cardPaket)
        val imgProfile: ImageView = findViewById(R.id.imgProfile)
        val buttonHelp: Button = findViewById(R.id.btnHelp)

        cardIdentifikasi.setOnClickListener {
            val intent = Intent(this@HomeActivity, IdentifikasiActivity::class.java)
            startActivity(intent)
        }

        cardChallenge.setOnClickListener {
            val intent = Intent(this@HomeActivity, ChallengeActivity::class.java)
            startActivity(intent)
        }

        cardPaket.setOnClickListener {
            val intent = Intent(this@HomeActivity, PaymentMethodActivity::class.java)
            startActivity(intent)
        }

        cardGame.setOnClickListener {
            val intent = Intent(this@HomeActivity, GamesActivity::class.java)
            startActivity(intent)
        }

        cardHistory.setOnClickListener {
            val intent = Intent(this@HomeActivity, HistoryActivity::class.java)
            startActivity(intent)
        }

        imgProfile.setOnClickListener {
            showPopupMenu(it)
        }

        val bottomNavigationView: BottomNavigationView = findViewById(R.id.bottomNavigationView)
        bottomNavigationView.setOnNavigationItemSelectedListener { item ->
            when (item.itemId) {
                R.id.navigation_person -> {
                    val intent = Intent(this, ProfileActivity::class.java)
                    startActivity(intent)
                    true
                }
                R.id.navigation_dashboard -> {

                    true
                }
                R.id.navigation_setting-> {
                    val intent = Intent(this, SettingActivity::class.java)
                    startActivity(intent)
                    true
                }
                else -> false
            }
        }

        buttonHelp.setOnClickListener { sendMessage("Hello saya butuh bantuan") }

    }


    private fun showPopupMenu(view: View) {
        val popupMenu = PopupMenu(this, view)
        popupMenu.inflate(R.menu.profile_popup_menu)

        popupMenu.setOnMenuItemClickListener { item: MenuItem ->
            when (item.itemId) {
                R.id.menu_profile -> {
                    val intent = Intent(this, ProfileActivity::class.java)
                    startActivity(intent)
                    true
                }
                R.id.menu_payment -> {
                    val intent = Intent(this, PaymentMethodActivity::class.java)
                    startActivity(intent)
                    true
                }
                R.id.menu_about -> {
                    val intent = Intent(this, AboutActivity::class.java)
                    startActivity(intent)
                    true
                }
                R.id.menu_logout -> {
                    successLogout()
                    true
                }
                else -> false
            }
        }

        popupMenu.show()
    }

    private fun sendMessage(message: String) {
        val phoneNumber = "6287763392220"
        val intent = Intent(Intent.ACTION_VIEW, Uri.parse("https://wa.me/$phoneNumber/?text=$message"))
        startActivity(intent)
    }

    private fun successLogout() {
        val sharedPreferences = getSharedPreferences("user_info", Context.MODE_PRIVATE)
        val editor = sharedPreferences.edit()
        editor.putBoolean("is_logged_out", true)
        editor.apply()

        auth = FirebaseAuth.getInstance()
        auth.signOut()

        val intent = Intent(this, LoginActivity::class.java)
        startActivity(intent)
        finish()
    }

}