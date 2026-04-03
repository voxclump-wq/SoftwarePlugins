using System;
using UnityEngine;

namespace AGICharacterService
{
    /// **Summary:**

    /// Data structure that matches the JSON sent from your website.
    /// Easy to extend when you add more fields to your character dashboard.
    /// 
    [Serializable]
    public class CharacterData
    {
        public string characterId = "";
        public PersonalityTraits personalityTraits = new PersonalityTraits();
        public string customPrompt = "";        // The full personality text from your dashboard (e.g. "You are the biggest asshole...")
        public string version = "1.0";
        public long timestamp = 0;
    }

    [Serializable]
    public class PersonalityTraits
    {
        public float aggression = 0.5f;
        public float humor = 0.5f;
        public float helpfulness = 0.7f;
        // Add more traits here as you expand your website character builder
        // Example: public float intelligence = 0.6f;
    }
}