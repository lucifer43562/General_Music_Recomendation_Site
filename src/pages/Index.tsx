import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Headphones, Play, Heart, Star, Sparkles, User, Search } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const musicGenres = [
  { name: "Bollywood", color: "bg-orange-500", emoji: "🎬" },
  { name: "Classical", color: "bg-indigo-500", emoji: "🎼" },
  { name: "Folk", color: "bg-pink-500", emoji: "🪕" },
  { name: "Devotional", color: "bg-yellow-500", emoji: "🙏" },
  { name: "Pop", color: "bg-blue-500", emoji: "🎵" },
  { name: "Rock", color: "bg-red-500", emoji: "🎸" },
  { name: "Qawwali", color: "bg-green-500", emoji: "🎤" },
  { name: "Sufi", color: "bg-purple-500", emoji: "✨" },
  { name: "Ghazal", color: "bg-amber-500", emoji: "🌹" },
  { name: "Punjabi", color: "bg-emerald-500", emoji: "🥁" },
  { name: "Tamil", color: "bg-cyan-500", emoji: "🎭" },
  { name: "Telugu", color: "bg-violet-500", emoji: "🎪" },
  { name: "Bengali", color: "bg-teal-500", emoji: "🎨" },
  { name: "Marathi", color: "bg-rose-500", emoji: "🎺" },
  { name: "Gujarati", color: "bg-lime-500", emoji: "🎻" }
];

const indianMusicDatabase = {
  "Arijit Singh": {
    "Bollywood": [
      { title: "Tum Hi Ho", artist: "Arijit Singh", rating: 4.9, spotifyId: "4kbj5MwxO1bq9wjT5g9HaA" },
      { title: "Channa Mereya", artist: "Arijit Singh", rating: 4.8, spotifyId: "1BxfuPKGuaTgP7aM0Bbdwr" },
      { title: "Raabta", artist: "Arijit Singh", rating: 4.7, spotifyId: "6JV5KNLS8cq3JWO1RSx9H7" },
      { title: "Pal Pal Dil Ke Paas", artist: "Arijit Singh", rating: 4.6, spotifyId: "2j4P8fQqKwn7L3Xv8dKZEr" }
    ],
    "Pop": [
      { title: "Kesariya", artist: "Arijit Singh", rating: 4.6, spotifyId: "7LVHVU3tWfcxj5aiPFEW4T" },
      { title: "Apna Bana Le", artist: "Arijit Singh", rating: 4.5, spotifyId: "7MXVkk9YMctZqd1Srtv4MB" }
    ]
  },
  "Shreya Ghoshal": {
    "Bollywood": [
      { title: "Teri Ore", artist: "Shreya Ghoshal", rating: 4.8, spotifyId: "3CyFKU4jEIj8x7tP5Bm4Q1" },
      { title: "Nagada Sang Dhol", artist: "Shreya Ghoshal", rating: 4.7, spotifyId: "5Db6HqoYUjMJLnt3FdoWsF" },
      { title: "Deewani Mastani", artist: "Shreya Ghoshal", rating: 4.6, spotifyId: "4ouMYWcnMaDxikXARH7rvi" },
      { title: "Ghoomar", artist: "Shreya Ghoshal", rating: 4.5, spotifyId: "1z8H9xKzVgQeJ2mP3nL6Qw" }
    ],
    "Classical": [
      { title: "Piya Tose Naina Lage Re", artist: "Shreya Ghoshal", rating: 4.9, spotifyId: "2Z7IuFKNDbKdJFJPaNmJNO" }
    ]
  },
  "A.R. Rahman": {
    "Bollywood": [
      { title: "Jai Ho", artist: "A.R. Rahman", rating: 5.0, spotifyId: "1mea3bSkSGXuIRvnydlB5b" },
      { title: "Tum Se Hi", artist: "A.R. Rahman", rating: 4.8, spotifyId: "0lPy3MiDlNcTKCJdHD4dTx" },
      { title: "Kun Faya Kun", artist: "A.R. Rahman", rating: 4.9, spotifyId: "4gzpq5DPGxSnKTe4SA8HAU" },
      { title: "Rehna Tu", artist: "A.R. Rahman", rating: 4.7, spotifyId: "3k8P9vQrJ7x2L1nR5mW8Ez" }
    ],
    "Sufi": [
      { title: "Khwaja Mere Khwaja", artist: "A.R. Rahman", rating: 4.7, spotifyId: "7z8b3gDe4KTW0K2sfjSpKG" },
      { title: "Arziyan", artist: "A.R. Rahman", rating: 4.6, spotifyId: "4A6PuPTiHcKwNE7Kw4zN7l" },
      { title: "Urvashi Urvashi", artist: "A.R. Rahman", rating: 4.5, spotifyId: "2j9K8fVqL3xR7mP1nW6Qz" },
      { title: "Vellai Pookal", artist: "A.R. Rahman", rating: 4.4, spotifyId: "1k2L3mN4oP5qR6sT8uV9wX" }
    ]
  },
  "Lata Mangeshkar": {
    "Bollywood": [
      { title: "Lag Jaa Gale", artist: "Lata Mangeshkar", rating: 5.0, spotifyId: "6KuwlLHjg6TTIub8wQA6kf" },
      { title: "Pyar Kiya To Darna Kya", artist: "Lata Mangeshkar", rating: 4.9, spotifyId: "1QjRvxoKGlCAL0bnDm8QnG" },
      { title: "Ajeeb Dastan Hai Yeh", artist: "Lata Mangeshkar", rating: 4.8, spotifyId: "3x8lrVF8E3OhO8yJFt37kN" }
    ],
    "Classical": [
      { title: "Ae Malik Tere Bande Hum", artist: "Lata Mangeshkar", rating: 4.7, spotifyId: "5HCyWlXZPP0y6Gqq8TgA9l" }
    ]
  },
  "Kishore Kumar": {
    "Bollywood": [
      { title: "Roop Tera Mastana", artist: "Kishore Kumar", rating: 4.9, spotifyId: "2VQc9orzD8y7BVWn2YBOpN" },
      { title: "Yeh Jo Mohabbat Hai", artist: "Kishore Kumar", rating: 4.8, spotifyId: "5uuJWnnr1pCKJ5PRKm6j6F" },
      { title: "Pag Ghungroo Bandh", artist: "Kishore Kumar", rating: 4.7, spotifyId: "7J2WlMfmb8w7J2WlMfmb8w" }
    ]
  },
  "Rahat Fateh Ali Khan": {
    "Qawwali": [
      { title: "Allah Hoo", artist: "Rahat Fateh Ali Khan", rating: 4.8, spotifyId: "4LRPiHfqMiTwSwuct9vQP2" },
      { title: "Tumhe Dillagi", artist: "Rahat Fateh Ali Khan", rating: 4.7, spotifyId: "5MZPiIgqMjUxTvuct9vQP3" }
    ],
    "Sufi": [
      { title: "Jiya Dhadak Dhadak", artist: "Rahat Fateh Ali Khan", rating: 4.6, spotifyId: "6NaPjJhqNkVyUwvct9vQP4" }
    ]
  },
  "Diljit Dosanjh": {
    "Punjabi": [
      { title: "Laembadgini", artist: "Diljit Dosanjh", rating: 4.5, spotifyId: "1z2x3c4v5YghIJklmnop6q" },
      { title: "Do You Know", artist: "Diljit Dosanjh", rating: 4.4, spotifyId: "2a3b4c5d6FrsLMnoqrst7u" },
      { title: "5 Taara", artist: "Diljit Dosanjh", rating: 4.3, spotifyId: "3b4c5d6e7GstNOpqrstu8v" }
    ],
    "Bollywood": [
      { title: "Ikk Kudi", artist: "Diljit Dosanjh", rating: 4.2, spotifyId: "4c5d6e7f8HtuPQrstuv9w" }
    ]
  },
  "Sonu Nigam": {
    "Bollywood": [
      { title: "Kal Ho Naa Ho", artist: "Sonu Nigam", rating: 4.8, spotifyId: "5d6e7f8g9IuvQRstuvwx0y" },
      { title: "Sandese Aate Hai", artist: "Sonu Nigam", rating: 4.7, spotifyId: "6e7f8g9h0JvwRStuvwxy1z" },
      { title: "Suraj Hua Maddham", artist: "Sonu Nigam", rating: 4.6, spotifyId: "7f8g9h0i1KwxSTuvwxyz2a" }
    ]
  },
  "Udit Narayan": {
    "Bollywood": [
      { title: "Papa Kehte Hain", artist: "Udit Narayan", rating: 4.7, spotifyId: "8g9h0i1j2LxyTUvwxyz3b" },
      { title: "Chand Chupa Badal Mein", artist: "Udit Narayan", rating: 4.6, spotifyId: "9h0i1j2k3MyzUVwxyz4c" },
      { title: "Is Kadar Pyar Hai", artist: "Udit Narayan", rating: 4.5, spotifyId: "0i1j2k3l4NzaVWxyz5d" }
    ]
  },
  "Kumar Sanu": {
    "Bollywood": [
      { title: "Dil Hai Ki Manta Nahin", artist: "Kumar Sanu", rating: 4.8, spotifyId: "1j2k3l4m5OabWXyz6e" },
      { title: "Ek Ladki Ko Dekha", artist: "Kumar Sanu", rating: 4.7, spotifyId: "2k3l4m5n6PbcXYz7f" },
      { title: "Mera Dil Bhi Kitna Pagal Hai", artist: "Kumar Sanu", rating: 4.6, spotifyId: "3l4m5n6o7QcdYZ8g" }
    ]
  },
  "Shaan": {
    "Bollywood": [
      { title: "Chand Sifarish", artist: "Shaan", rating: 4.6, spotifyId: "4m5n6o7p8RdeZ9h" },
      { title: "Woh Ladki Hai Kahan", artist: "Shaan", rating: 4.5, spotifyId: "5n6o7p8q9Sefa0i" },
      { title: "Jab Se Tere Naina", artist: "Shaan", rating: 4.4, spotifyId: "6o7p8q9r0Tfgb1j" }
    ],
    "Pop": [
      { title: "Tanha Dil", artist: "Shaan", rating: 4.3, spotifyId: "7p8q9r0s1Ughc2k" }
    ]
  },
  "Alka Yagnik": {
    "Bollywood": [
      { title: "Taal Se Taal", artist: "Alka Yagnik", rating: 4.7, spotifyId: "8q9r0s1t2Vhid3l" },
      { title: "Kuch Kuch Hota Hai", artist: "Alka Yagnik", rating: 4.6, spotifyId: "9r0s1t2u3Wije4m" },
      { title: "Bole Chudiyan", artist: "Alka Yagnik", rating: 4.5, spotifyId: "0s1t2u3v4Xjkf5n" }
    ]
  },
  "Sunidhi Chauhan": {
    "Bollywood": [
      { title: "Beedi Jalaile", artist: "Sunidhi Chauhan", rating: 4.6, spotifyId: "1t2u3v4w5Yklg6o" },
      { title: "Crazy Kiya Re", artist: "Sunidhi Chauhan", rating: 4.5, spotifyId: "2u3v4w5x6Zlmh7p" },
      { title: "Dhoom Machale", artist: "Sunidhi Chauhan", rating: 4.4, spotifyId: "3v4w5x6y7Amni8q" }
    ]
  },
  "Kailash Kher": {
    "Sufi": [
      { title: "Allah Ke Bande", artist: "Kailash Kher", rating: 4.7, spotifyId: "4w5x6y7z8Bnoj9r" },
      { title: "Teri Deewani", artist: "Kailash Kher", rating: 4.6, spotifyId: "5x6y7z8a9Copk0s" }
    ],
    "Folk": [
      { title: "Saiyaan", artist: "Kailash Kher", rating: 4.5, spotifyId: "6y7z8a9b0Dpql1t" }
    ]
  },
  "Mohit Chauhan": {
    "Bollywood": [
      { title: "Tum Se Hi", artist: "Mohit Chauhan", rating: 4.8, spotifyId: "7z8a9b0c1Eqrm2u" },
      { title: "Masakali", artist: "Mohit Chauhan", rating: 4.7, spotifyId: "8a9b0c1d2Frsn3v" },
      { title: "Pee Loon", artist: "Mohit Chauhan", rating: 4.6, spotifyId: "9b0c1d2e3Gsto4w" }
    ]
  },
  "Armaan Malik": {
    "Bollywood": [
      { title: "Bol Do Na Zara", artist: "Armaan Malik", rating: 4.5, spotifyId: "0c1d2e3f4Htup5x" },
      { title: "Main Hoon Hero Tera", artist: "Armaan Malik", rating: 4.4, spotifyId: "1d2e3f4g5Iuvq6y" },
      { title: "Wajah Tum Ho", artist: "Armaan Malik", rating: 4.3, spotifyId: "2e3f4g5h6Jvwr7z" }
    ],
    "Pop": [
      { title: "Control", artist: "Armaan Malik", rating: 4.2, spotifyId: "3f4g5h6i7Kwxs8a" }
    ]
  },
  "Vishal Dadlani": {
    "Bollywood": [
      { title: "Malhari", artist: "Vishal Dadlani", rating: 4.6, spotifyId: "4g5h6i7j8Lxyt9b" },
      { title: "Balam Pichkari", artist: "Vishal Dadlani", rating: 4.5, spotifyId: "5h6i7j8k9Myzu0c" }
    ],
    "Rock": [
      { title: "Jhoom Barabar Jhoom", artist: "Vishal Dadlani", rating: 4.4, spotifyId: "6i7j8k9l0Nzav1d" }
    ]
  },
  "Shekhar Ravjiani": {
    "Bollywood": [
      { title: "Tujhe Bhula Diya", artist: "Shekhar Ravjiani", rating: 4.5, spotifyId: "7j8k9l0m1Oabw2e" },
      { title: "Bin Tere", artist: "Shekhar Ravjiani", rating: 4.4, spotifyId: "8k9l0m1n2Pbcx3f" }
    ]
  },
  "Raghav Sachar": {
    "Pop": [
      { title: "Angel", artist: "Raghav Sachar", rating: 4.3, spotifyId: "9l0m1n2o3Qcdy4g" },
      { title: "Teri Meri", artist: "Raghav Sachar", rating: 4.2, spotifyId: "0m1n2o3p4Rdez5h" }
    ]
  },
  "Atif Aslam": {
    "Bollywood": [
      { title: "Tere Bin", artist: "Atif Aslam", rating: 4.8, spotifyId: "1n2o3p4q5Sefa6i" },
      { title: "Aadat", artist: "Atif Aslam", rating: 4.7, spotifyId: "2o3p4q5r6Tfgb7j" },
      { title: "Tu Jaane Na", artist: "Atif Aslam", rating: 4.6, spotifyId: "3p4q5r6s7Ughc8k" }
    ]
  },
  "S.P. Balasubrahmanyam": {
    "Tamil": [
      { title: "Mannil Indha Kadhal", artist: "S.P. Balasubrahmanyam", rating: 4.9, spotifyId: "4q5r6s7t8Vhid9l" },
      { title: "Raag Bhairavi", artist: "S.P. Balasubrahmanyam", rating: 4.8, spotifyId: "5r6s7t8u9Wije0m" }
    ],
    "Telugu": [
      { title: "Sankarabharanam", artist: "S.P. Balasubrahmanyam", rating: 4.7, spotifyId: "6s7t8u9v0Xjkf1n" }
    ],
    "Classical": [
      { title: "Om Namah Shivaya", artist: "S.P. Balasubrahmanyam", rating: 4.6, spotifyId: "7t8u9v0w1Yklg2o" }
    ]
  },
  "K.J. Yesudas": {
    "Classical": [
      { title: "Harivarasanam", artist: "K.J. Yesudas", rating: 4.9, spotifyId: "8u9v0w1x2Zlmh3p" },
      { title: "Guru Brahma", artist: "K.J. Yesudas", rating: 4.8, spotifyId: "9v0w1x2y3Amni4q" }
    ],
    "Devotional": [
      { title: "Krishna Nee Begane Baaro", artist: "K.J. Yesudas", rating: 4.7, spotifyId: "0w1x2y3z4Bnoj5r" }
    ]
  },
  "Ilayaraja": {
    "Tamil": [
      { title: "Rakkamma Kaiya Thattu", artist: "Ilayaraja", rating: 4.8, spotifyId: "1x2y3z4a5Copk6s" },
      { title: "Chinna Chinna Aasai", artist: "Ilayaraja", rating: 4.7, spotifyId: "2y3z4a5b6Dpql7t" }
    ],
    "Classical": [
      { title: "How to Name It", artist: "Ilayaraja", rating: 4.6, spotifyId: "3z4a5b6c7Eqrm8u" }
    ]
  },
  "Hariharan": {
    "Ghazal": [
      { title: "Ranjish Hi Sahi", artist: "Hariharan", rating: 4.7, spotifyId: "4a5b6c7d8Frsn9v" },
      { title: "Tu Hi Re", artist: "Hariharan", rating: 4.6, spotifyId: "5b6c7d8e9Gsto0w" }
    ],
    "Classical": [
      { title: "Guru Vandana", artist: "Hariharan", rating: 4.5, spotifyId: "6c7d8e9f0Htup1x" }
    ]
  },
  "Adnan Sami Khan": {
    "Pop": [
      { title: "Kabhi To Nazar Milao", artist: "Adnan Sami", rating: 4.5, spotifyId: "7d8e9f0g1Iuvq2y" },
      { title: "Lift Karadey", artist: "Adnan Sami", rating: 4.4, spotifyId: "8e9f0g1h2Jvwr3z" },
      { title: "Tera Chehra", artist: "Adnan Sami", rating: 4.3, spotifyId: "9f0g1h2i3Kwxs4a" }
    ]
  },
  "Jubin Nautiyal": {
    "Bollywood": [
      { title: "Tum Hi Aana", artist: "Jubin Nautiyal", rating: 4.6, spotifyId: "0g1h2i3j4Lxyt5b" },
      { title: "Kaabil Hoon", artist: "Jubin Nautiyal", rating: 4.5, spotifyId: "1h2i3j4k5Myzu6c" },
      { title: "Tujhe Kitna Chahne Lage", artist: "Jubin Nautiyal", rating: 4.4, spotifyId: "2i3j4k5l6Nzav7d" }
    ]
  },
  "Darshan Raval": {
    "Pop": [
      { title: "Tera Zikr", artist: "Darshan Raval", rating: 4.5, spotifyId: "3j4k5l6m7Oabw8e" },
      { title: "Kamariya", artist: "Darshan Raval", rating: 4.4, spotifyId: "4k5l6m7n8Pbcx9f" },
      { title: "Bhula Dunga", artist: "Darshan Raval", rating: 4.3, spotifyId: "5l6m7n8o9Qcdy0g" }
    ]
  },
  "Guru Randhawa": {
    "Punjabi": [
      { title: "Lahore", artist: "Guru Randhawa", rating: 4.6, spotifyId: "6m7n8o9p0Rdez1h" },
      { title: "High Rated Gabru", artist: "Guru Randhawa", rating: 4.5, spotifyId: "7n8o9p0q1Sefa2i" },
      { title: "Suit Suit", artist: "Guru Randhawa", rating: 4.4, spotifyId: "8o9p0q1r2Tfgb3j" }
    ],
    "Pop": [
      { title: "Made in India", artist: "Guru Randhawa", rating: 4.3, spotifyId: "9p0q1r2s3Ughc4k" }
    ]
  },
  "Badshah": {
    "Punjabi": [
      { title: "DJ Waley Babu", artist: "Badshah", rating: 4.4, spotifyId: "0q1r2s3t4Vhid5l" },
      { title: "Kar Gayi Chull", artist: "Badshah", rating: 4.3, spotifyId: "1r2s3t4u5Wije6m" },
      { title: "Genda Phool", artist: "Badshah", rating: 4.2, spotifyId: "2s3t4u5v6Xjkf7n" }
    ]
  },
  "Yo Yo Honey Singh": {
    "Punjabi": [
      { title: "Blue Eyes", artist: "Yo Yo Honey Singh", rating: 4.3, spotifyId: "3t4u5v6w7Yklg8o" },
      { title: "Lungi Dance", artist: "Yo Yo Honey Singh", rating: 4.2, spotifyId: "4u5v6w7x8Zlmh9p" },
      { title: "Manali Trance", artist: "Yo Yo Honey Singh", rating: 4.1, spotifyId: "5v6w7x8y9Amni0q" }
    ]
  },
  "Gippy Grewal": {
    "Punjabi": [
      { title: "Angreji Beat", artist: "Gippy Grewal", rating: 4.4, spotifyId: "6w7x8y9z0Bnoj1r" },
      { title: "Mutiyaar", artist: "Gippy Grewal", rating: 4.3, spotifyId: "7x8y9z0a1Copk2s" },
      { title: "Hello Hello", artist: "Gippy Grewal", rating: 4.2, spotifyId: "8y9z0a1b2Dpql3t" }
    ]
  },
  "Jazzy B": {
    "Punjabi": [
      { title: "This Party Gettin Hot", artist: "Jazzy B", rating: 4.3, spotifyId: "9z0a1b2c3Eqrm4u" },
      { title: "Naag", artist: "Jazzy B", rating: 4.2, spotifyId: "0a1b2c3d4Frsn5v" },
      { title: "Romeo", artist: "Jazzy B", rating: 4.1, spotifyId: "1b2c3d4e5Gsto6w" }
    ]
  },
  "Geeta Dutt": {
    "Bollywood": [
      { title: "Babuji Dheere Chalna", artist: "Geeta Dutt", rating: 4.8, spotifyId: "2c3d4e5f6Htup7x" },
      { title: "Mera Naam Chin Chin Chu", artist: "Geeta Dutt", rating: 4.7, spotifyId: "3d4e5f6g7Iuvq8y" },
      { title: "Waqt Ne Kiya", artist: "Geeta Dutt", rating: 4.6, spotifyId: "4e5f6g7h8Jvwr9z" }
    ]
  },
  "Asha Bhosle": {
    "Bollywood": [
      { title: "Dum Maro Dum", artist: "Asha Bhosle", rating: 4.9, spotifyId: "5f6g7h8i9Kwxs0a" },
      { title: "Chura Liya Hai Tumne", artist: "Asha Bhosle", rating: 4.8, spotifyId: "6g7h8i9j0Lxyt1b" },
      { title: "Piya Tu Ab To Aaja", artist: "Asha Bhosle", rating: 4.7, spotifyId: "7h8i9j0k1Myzu2c" }
    ]
  },
  "Hemant Kumar": {
    "Bollywood": [
      { title: "Jaane Tu Ya Jaane Na", artist: "Hemant Kumar", rating: 4.6, spotifyId: "8i9j0k1l2Nzav3d" },
      { title: "Na Tum Hamen Jano", artist: "Hemant Kumar", rating: 4.5, spotifyId: "9j0k1l2m3Oabw4e" }
    ]
  },
  "Manna Dey": {
    "Bollywood": [
      { title: "Ae Meri Zohra Jabeen", artist: "Manna Dey", rating: 4.7, spotifyId: "0k1l2m3n4Pbcx5f" },
      { title: "Yeh Raat Bheegi Bheegi", artist: "Manna Dey", rating: 4.6, spotifyId: "1l2m3n4o5Qcdy6g" }
    ]
  },
  "Mukesh": {
    "Bollywood": [
      { title: "Kai Baar Yuhi Dekha Hai", artist: "Mukesh", rating: 4.8, spotifyId: "2m3n4o5p6Rdez7h" },
      { title: "Awara Hoon", artist: "Mukesh", rating: 4.7, spotifyId: "3n4o5p6q7Sefa8i" },
      { title: "Suhana Safar Aur Yeh Mausam Haseen", artist: "Mukesh", rating: 4.6, spotifyId: "4o5p6q7r8Tfgb9j" }
    ]
  },
  "Talat Mahmood": {
    "Ghazal": [
      { title: "Zindagi Denewale Sun", artist: "Talat Mahmood", rating: 4.7, spotifyId: "5p6q7r8s9Ughc0k" },
      { title: "Mohabbat Mein Aise Zamane", artist: "Talat Mahmood", rating: 4.6, spotifyId: "6q7r8s9t0Vhid1l" }
    ],
    "Bollywood": [
      { title: "Jalte Hain Jiske Liye", artist: "Talat Mahmood", rating: 4.5, spotifyId: "7r8s9t0u1Wije2m" }
    ]
  },
  "Rafi": {
    "Bollywood": [
      { title: "Yeh Reshmi Zulfein", artist: "Mohammed Rafi", rating: 4.9, spotifyId: "8s9t0u1v2Xjkf3n" },
      { title: "Chaudhvin Ka Chand", artist: "Mohammed Rafi", rating: 4.8, spotifyId: "9t0u1v2w3Yklg4o" },
      { title: "Gulabi Aankhen", artist: "Mohammed Rafi", rating: 4.7, spotifyId: "0u1v2w3x4Zlmh5p" }
    ]
  },
  "Jagjit Singh": {
    "Ghazal": [
      { title: "Hothon Se Chhoo Lo Tum", artist: "Jagjit Singh", rating: 4.9, spotifyId: "1v2w3x4y5Amni6q" },
      { title: "Woh Kagaz Ki Kashti", artist: "Jagjit Singh", rating: 4.8, spotifyId: "2w3x4y5z6Bnoj7r" },
      { title: "Tumhari Yaad Aayee Hai", artist: "Jagjit Singh", rating: 4.7, spotifyId: "3x4y5z6a7Copk8s" }
    ]
  },
  "Gulzar": {
    "Bollywood": [
      { title: "Tere Bina Zindagi Se", artist: "Gulzar", rating: 4.8, spotifyId: "4y5z6a7b8Dpql9t" },
      { title: "Mera Kuch Samaan", artist: "Gulzar", rating: 4.7, spotifyId: "5z6a7b8c9Eqrm0u" }
    ]
  },
  "Pandit Jasraj": {
    "Classical": [
      { title: "Om Namo Bhagavate", artist: "Pandit Jasraj", rating: 4.9, spotifyId: "6a7b8c9d0Frsn1v" },
      { title: "Raag Yaman", artist: "Pandit Jasraj", rating: 4.8, spotifyId: "7b8c9d0e1Gsto2w" }
    ],
    "Devotional": [
      { title: "Maitri Bhavanu", artist: "Pandit Jasraj", rating: 4.7, spotifyId: "8c9d0e1f2Htup3x" }
    ]
  },
  "Ustad Bismillah Khan": {
    "Classical": [
      { title: "Raag Kafi", artist: "Ustad Bismillah Khan", rating: 4.9, spotifyId: "9d0e1f2g3Iuvq4y" },
      { title: "Raag Yaman Kalyan", artist: "Ustad Bismillah Khan", rating: 4.8, spotifyId: "0e1f2g3h4Jvwr5z" }
    ]
  },
  "Ustad Zakir Hussain": {
    "Classical": [
      { title: "Tabla Solo in Teental", artist: "Ustad Zakir Hussain", rating: 4.8, spotifyId: "1f2g3h4i5Kwxs6a" },
      { title: "Raag Jhinjhoti", artist: "Ustad Zakir Hussain", rating: 4.7, spotifyId: "2g3h4i5j6Lxyt7b" }
    ]
  },
  "Pandit Ravi Shankar": {
    "Classical": [
      { title: "Raag Jog", artist: "Pandit Ravi Shankar", rating: 4.9, spotifyId: "3h4i5j6k7Myzu8c" },
      { title: "Raag Bageshri", artist: "Pandit Ravi Shankar", rating: 4.8, spotifyId: "4i5j6k7l8Nzav9d" }
    ]
  },
  "Bhupen Hazarika": {
    "Folk": [
      { title: "Dil Hoom Hoom Kare", artist: "Bhupen Hazarika", rating: 4.7, spotifyId: "5j6k7l8m9Oabw0e" },
      { title: "Ganga Behti Ho Kyun", artist: "Bhupen Hazarika", rating: 4.6, spotifyId: "6k7l8m9n0Pbcx1f" }
    ]
  },
  "Shubha Mudgal": {
    "Classical": [
      { title: "Raag Puriya Dhanashri", artist: "Shubha Mudgal", rating: 4.8, spotifyId: "7l8m9n0o1Qcdy2g" },
      { title: "Shree Raag", artist: "Shubha Mudgal", rating: 4.7, spotifyId: "8m9n0o1p2Rdez3h" }
    ]
  },
  "Anup Jalota": {
    "Devotional": [
      { title: "Aisi Lagi Lagan", artist: "Anup Jalota", rating: 4.7, spotifyId: "9n0o1p2q3Sefa4i" },
      { title: "Jag Mein Sundar Hain Do Naam", artist: "Anup Jalota", rating: 4.6, spotifyId: "0o1p2q3r4Tfgb5j" }
    ],
    "Ghazal": [
      { title: "Teri Akhiyan Ke Darshan", artist: "Anup Jalota", rating: 4.5, spotifyId: "1p2q3r4s5Ughc6k" }
    ]
  },
  "Hariharan & Lesle Lewis": {
    "Pop": [
      { title: "Colonial Cousins", artist: "Hariharan & Lesle Lewis", rating: 4.4, spotifyId: "2q3r4s5t6Vhid7l" },
      { title: "Krishna", artist: "Hariharan & Lesle Lewis", rating: 4.3, spotifyId: "3r4s5t6u7Wije8m" }
    ]
  }
};

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [step, setStep] = useState<"login" | "home" | "search" | "recommendations">("login");
  const [selectedArtist, setSelectedArtist] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [isSignUp, setIsSignUp] = useState(false);
  const [artistSearch, setArtistSearch] = useState("");
  const { toast } = useToast();

  const handleAuth = () => {
    // Accept any email and password combination for both login and signup
    if (loginForm.email.trim() && loginForm.password.trim() && loginForm.email.includes('@')) {
      setIsAuthenticated(true);
      setCurrentUser(loginForm.email.split('@')[0]);
      setStep("home");
      toast({
        title: "Welcome! 🎵",
        description: `Successfully ${isSignUp ? 'signed up' : 'logged in'}!`,
      });
    } else {
      toast({
        title: "Invalid Credentials",
        description: "Please enter a valid email and password.",
        variant: "destructive"
      });
    }
  };

  const handleGenreToggle = (genreName: string) => {
    setSelectedGenres(prev => 
      prev.includes(genreName) 
        ? prev.filter(g => g !== genreName)
        : [...prev, genreName]
    );
  };

  const getAvailableGenres = () => {
    if (!selectedArtist) return [];
    const artistData = indianMusicDatabase[selectedArtist as keyof typeof indianMusicDatabase];
    if (!artistData) return [];
    return Object.keys(artistData);
  };

  const getRecommendations = () => {
    if (!selectedArtist || selectedGenres.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please select an artist and at least one genre.",
        variant: "destructive"
      });
      return;
    }

    const artistData = indianMusicDatabase[selectedArtist as keyof typeof indianMusicDatabase];
    if (!artistData) {
      toast({
        title: "Artist Not Found",
        description: "Sorry, we don't have songs for this artist yet.",
        variant: "destructive"
      });
      return;
    }

    setStep("recommendations");
    toast({
      title: "🎵 Recommendations Ready!",
      description: `Found amazing tracks by ${selectedArtist}!`,
    });
  };

  const getArtistRecommendations = () => {
    const artistData = indianMusicDatabase[selectedArtist as keyof typeof indianMusicDatabase];
    if (!artistData) return [];

    const recommendations: any[] = [];
    selectedGenres.forEach(genre => {
      if (artistData[genre as keyof typeof artistData]) {
        recommendations.push(...(artistData[genre as keyof typeof artistData] as any[]));
      }
    });

    return recommendations;
  };

  const handlePlaySong = (spotifyId: string, songTitle: string) => {
    // Fixed Spotify URL format - using track instead of open
    const spotifyUrl = `https://open.spotify.com/track/${spotifyId}`;
    window.open(spotifyUrl, '_blank');
    toast({
      title: "🎵 Opening Spotify",
      description: `Playing "${songTitle}" on Spotify!`,
    });
  };

  const filteredArtists = Object.keys(indianMusicDatabase).filter(artist =>
    artist.toLowerCase().includes(artistSearch.toLowerCase())
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAuth();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-900 via-black to-orange-800 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-600 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-40 left-1/2 w-60 h-60 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {step === "login" && (
          <div className="max-w-md mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <Music className="mx-auto w-24 h-24 text-orange-400 mb-4 animate-bounce" />
              <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                IndianTunes
              </h1>
              <p className="text-xl text-orange-200 mb-8">
                Discover Amazing Indian Music
              </p>
            </div>
            
            <Card className="bg-black/40 backdrop-blur-md border-orange-500/30">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center justify-center gap-2">
                  <User className="w-5 h-5" />
                  {isSignUp ? "Create Account" : "Welcome Back"}
                </CardTitle>
                <CardDescription className="text-orange-200">
                  {isSignUp ? "Join IndianTunes today" : "Sign in to discover music"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <input
                  type="email"
                  value={loginForm.email}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                  placeholder="Email address..."
                  className="w-full p-3 rounded-lg bg-black/50 border border-orange-500/30 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                  autoFocus
                />
                <input
                  type="password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                  onKeyPress={handleKeyPress}
                  placeholder="Password..."
                  className="w-full p-3 rounded-lg bg-black/50 border border-orange-500/30 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                />
                <Button 
                  onClick={handleAuth}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 rounded-lg transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                >
                  {isSignUp ? "Sign Up" : "Sign In"}
                </Button>
                <p className="text-orange-300 text-sm">
                  {isSignUp ? "Already have an account?" : "Don't have an account?"}
                  <button 
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-orange-400 hover:text-orange-300 ml-2 underline transition-colors duration-200"
                  >
                    {isSignUp ? "Sign In" : "Sign Up"}
                  </button>
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "home" && (
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <div className="mb-8">
              <h2 className="text-5xl font-bold text-white mb-4">
                Welcome, {currentUser}! 🎵
              </h2>
              <p className="text-xl text-orange-200">
                Ready to discover amazing Indian music?
              </p>
            </div>

            <Card className="bg-black/40 backdrop-blur-md border-orange-500/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="mb-6">
                  <Sparkles className="mx-auto w-16 h-16 text-orange-400 mb-4 animate-pulse" />
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">Start Your Musical Journey</h3>
                  <p className="text-orange-200">Find songs by your favorite Indian artists</p>
                </div>
                
                <Button 
                  onClick={() => setStep("search")}
                  size="lg"
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 px-8 rounded-full transform hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-orange-500/25"
                >
                  <Search className="w-6 h-6 mr-2" />
                  Find Indian Music
                </Button>
              </CardContent>
            </Card>
          </div>
        )}

        {step === "search" && (
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Find Your Favorite Artist! 🎵
              </h2>
              <p className="text-xl text-orange-200">
                Search for Indian singers and select genres
              </p>
            </div>

            <div className="space-y-8">
              {/* Artist Search */}
              <Card className="bg-black/40 backdrop-blur-md border-orange-500/30">
                <CardHeader>
                  <CardTitle className="text-orange-400 flex items-center gap-2">
                    <Search className="w-5 h-5" />
                    Search Indian Artists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <input
                      type="text"
                      value={artistSearch}
                      onChange={(e) => setArtistSearch(e.target.value)}
                      placeholder="Search for artists like Arijit Singh, Shreya Ghoshal..."
                      className="w-full p-3 rounded-lg bg-black/50 border border-orange-500/30 text-white placeholder-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-all duration-200"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredArtists.map((artist) => (
                      <Card
                        key={artist}
                        className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                          selectedArtist === artist
                            ? "bg-orange-500 shadow-lg shadow-orange-500/30 border-orange-400"
                            : "bg-black/20 hover:bg-black/40 border-orange-500/20"
                        } backdrop-blur-md`}
                        onClick={() => setSelectedArtist(artist)}
                      >
                        <CardContent className="p-4 text-center">
                          <div className="text-2xl mb-2">🎤</div>
                          <h3 className="font-semibold text-white text-sm">{artist}</h3>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Genre Selection - Only show available genres for selected artist */}
              {selectedArtist && (
                <Card className="bg-black/40 backdrop-blur-md border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-400">Available Genres for {selectedArtist}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                      {getAvailableGenres().map((genreName) => {
                        const genre = musicGenres.find(g => g.name === genreName);
                        if (!genre) return null;
                        
                        return (
                          <Card
                            key={genre.name}
                            className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                              selectedGenres.includes(genre.name)
                                ? `${genre.color} shadow-lg shadow-white/20 border-white/50`
                                : "bg-black/20 hover:bg-black/40 border-orange-500/20"
                            } backdrop-blur-md`}
                            onClick={() => handleGenreToggle(genre.name)}
                          >
                            <CardContent className="p-4 text-center">
                              <div className="text-3xl mb-2">{genre.emoji}</div>
                              <h3 className="font-semibold text-white text-sm">{genre.name}</h3>
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    {selectedGenres.length > 0 && (
                      <div className="mb-6">
                        <p className="text-orange-200 mb-2">Selected genres:</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {selectedGenres.map((genre) => (
                            <Badge key={genre} className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                              {genre}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="text-center">
                      <Button 
                        onClick={getRecommendations}
                        className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-3 px-8 rounded-full transform hover:scale-105 transition-all duration-200 shadow-lg hover:shadow-orange-500/25"
                        size="lg"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        Get My Recommendations!
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        )}

        {step === "recommendations" && (
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-white mb-2">
                Perfect Picks for You! 🎵
              </h2>
              <p className="text-xl text-orange-200">
                Songs by {selectedArtist} in {selectedGenres.join(", ")}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {getArtistRecommendations().map((track, index) => (
                <Card key={index} className="bg-black/40 backdrop-blur-md border-orange-500/30 hover:bg-black/60 transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-orange-500/20">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-white text-lg mb-1">{track.title}</h3>
                        <p className="text-orange-200">{track.artist}</p>
                      </div>
                      <Button 
                        size="sm" 
                        onClick={() => handlePlaySong(track.spotifyId, track.title)}
                        className="bg-orange-500 hover:bg-orange-600 rounded-full p-2 transform hover:scale-110 transition-all duration-200"
                      >
                        <Play className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(track.rating) ? 'text-orange-400 fill-current' : 'text-gray-400'}`} 
                          />
                        ))}
                        <span className="text-orange-200 ml-2">{track.rating}</span>
                      </div>
                      <Button size="sm" variant="ghost" className="text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 transition-all duration-200">
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center space-x-4">
              <Button 
                onClick={() => setStep("search")}
                className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all duration-200"
              >
                Search Again
              </Button>
              <Button 
                onClick={() => setStep("home")}
                variant="outline"
                className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 hover:border-orange-400 transition-all duration-200"
              >
                Back to Home
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
