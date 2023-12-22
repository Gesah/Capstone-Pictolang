package com.example.pictolangapp.data.remote.firebasemanager

import com.google.firebase.database.FirebaseDatabase

object FirebaseManager {

    private var database: FirebaseDatabase? = null

    private const val DATABASE_URL = "https://pictolang.asia-southeast1.firebasedatabase.app/"

    private fun getDatabaseInstance(): FirebaseDatabase {
        if (database == null) {
            try {
                database = FirebaseDatabase.getInstance(DATABASE_URL)
            } catch (e: Exception) {
                e.printStackTrace()
            }
        }
        return database!!
    }

    fun getUsersReference() = getDatabaseInstance().reference.child("users")
}
