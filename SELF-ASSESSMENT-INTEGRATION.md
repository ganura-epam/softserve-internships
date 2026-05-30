# Self-Assessment Integration Guide

## Overview

The self-assessment feature is now **integrated directly into the application form**!

When applicants select their preferred track, they'll see 4 relevant skill assessment questions automatically appear on the same page.

---

## How It Works

### 1. **Dynamic Questions**
- User selects a track (e.g., "Cloud Computing")
- 4 relevant questions appear instantly
- Questions are track-specific and validate skills
- All answers save to Firebase with the application

### 2. **Question Types**
- **Dropdown selections**: Experience levels (Beginner to Expert)
- **Checkboxes**: Multiple tools/technologies
- **Required fields**: All questions must be answered to submit

### 3. **Data Storage**
All self-assessment answers are saved in Firebase under `self_assessment` field:

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "track": "Cloud Computing",
  "self_assessment": {
    "q1": {
      "question": "1. How would you rate your overall cloud computing knowledge? *",
      "answer": "3"
    },
    "q2": {
      "question": "2. Which cloud platforms have you worked with? *",
      "answer": "AWS, GCP"
    },
    "q3": {
      "question": "3. Have you used Docker? *",
      "answer": "Tutorial"
    },
    "q4": {
      "question": "4. CI/CD Pipeline Experience? *",
      "answer": "Concept"
    }
  },
  "cgpa": "8.5 CGPA",
  "resume_url": "https://...",
  "submitted_at": "2026-05-30T12:34:56.789Z"
}
```

---

## Questions Per Track

### ☁️ **Cloud Computing** (4 Questions)

1. **Overall cloud computing knowledge** (1-5 rating)
   - Beginner → Expert

2. **Which cloud platforms worked with?** (Checkboxes)
   - AWS, Azure, GCP, None yet

3. **Docker experience?** (Dropdown)
   - Built containers → Never heard of it

4. **CI/CD Pipeline experience?** (Dropdown)
   - Built pipelines → Never heard of CI/CD

---

### 📊 **Data Analytics** (4 Questions)

1. **Overall data analytics knowledge** (1-5 rating)
   - Beginner → Expert

2. **SQL Experience?** (Dropdown)
   - Expert (complex queries) → No experience

3. **Experience with BI Tools?** (Checkboxes)
   - Power BI, Tableau, Excel, None yet

4. **Statistical Knowledge?** (Dropdown)
   - Strong (hypothesis testing) → Learning

---

### 🧠 **Data Science** (4 Questions)

1. **Overall data science knowledge** (1-5 rating)
   - Beginner → Expert

2. **Python Programming Experience?** (Dropdown)
   - Advanced (complex projects) → No experience

3. **Python Libraries Used?** (Checkboxes)
   - NumPy, Pandas, Matplotlib, Scikit-learn, None yet

4. **Machine Learning Knowledge?** (Dropdown)
   - Deployed ML models → No experience

---

### 💻 **Web Development** (4 Questions)

1. **Overall web development knowledge** (1-5 rating)
   - Beginner → Expert

2. **JavaScript Proficiency?** (Dropdown)
   - Advanced (ES6+, async) → No experience

3. **Frontend Frameworks Used?** (Checkboxes)
   - React, Angular, Vue, Vanilla JS, None yet

4. **Backend Development Experience?** (Checkboxes)
   - Node.js, Express, Python, None yet

---

### 🤖 **Generative AI** (4 Questions)

1. **Overall Generative AI knowledge** (1-5 rating)
   - Beginner → Expert

2. **Which AI models/APIs used?** (Checkboxes)
   - OpenAI, Claude, Gemini, None yet

3. **Prompt Engineering Experience?** (Dropdown)
   - Advanced (chain-of-thought) → Beginner

4. **RAG Knowledge?** (Dropdown)
   - Built RAG systems → Never heard of it

---

## User Experience Flow

1. User fills basic info (Name, Email, Phone, College, Year)
2. User selects **Preferred Track** dropdown
3. ✨ **Self-assessment section appears** with 4 questions
4. User answers the 4 questions (all required)
5. User uploads resume
6. User submits form
7. All data (including self-assessment) saves to Firebase

---

## Viewing Self-Assessment Data

### In Firebase Console:

1. Go to: https://console.firebase.google.com/
2. Select project: `softserve-internships`
3. Click **Firestore Database**
4. Click **applications** collection
5. Click any document
6. See `self_assessment` field with all Q&A pairs

### Example Document View:
```
applications/abc123xyz
├─ name: "John Doe"
├─ email: "john@example.com"
├─ track: "Cloud Computing"
├─ self_assessment:
│  ├─ q1:
│  │  ├─ question: "1. How would you rate..."
│  │  └─ answer: "3"
│  ├─ q2:
│  │  ├─ question: "2. Which cloud platforms..."
│  │  └─ answer: "AWS, GCP"
│  └─ ...
└─ submitted_at: "2026-05-30T..."
```

---

## Export Data for Analysis

### Export to Google Sheets:

1. Firebase Console → Firestore Database → applications
2. Click **Export** (top right)
3. Choose **JSON** or **CSV**
4. Download and analyze in Excel/Sheets

### Sample Analysis:

**Track-wise Skill Distribution:**
- Count applicants by experience level (1-5 rating)
- See most common tools (checkboxes)
- Identify skill gaps

**Example Query:**
- "How many Cloud Computing applicants have Docker experience?"
- Filter `track = "Cloud Computing"` AND `self_assessment.q3.answer = "Built"`

---

## Benefits

✅ **For You:**
- Instant skill assessment during application
- No separate Google Form needed
- All data in one place (Firebase)
- Easy to filter candidates by skill level
- Automated data collection

✅ **For Applicants:**
- Seamless one-page application
- No need to fill multiple forms
- Questions relevant to their chosen track
- Quick 4-question assessment (2 minutes)

---

## Technical Details

### Files Modified:

1. **index.html**
   - Added self-assessment section after track selection
   - 5 question sets (one per track)
   - Dynamic show/hide based on track

2. **css/styles.css**
   - Styled assessment section with blue background
   - Checkbox group styling
   - Fade-in animation for questions

3. **js/main.js**
   - Track selection listener
   - Dynamic question visibility
   - `getSelfAssessmentAnswers()` function
   - Save answers to Firebase

### How Questions Appear/Disappear:

```javascript
// When track changes
trackSelect.addEventListener('change', function() {
    const selectedTrack = this.value;

    // Hide all question sections
    document.querySelectorAll('.track-questions').forEach(section => {
        section.style.display = 'none';
    });

    // Show relevant section
    if (selectedTrack) {
        const trackKey = selectedTrack.toLowerCase().replace(/\s+/g, '-');
        const questionSection = document.getElementById(`questions-${trackKey}`);
        questionSection.style.display = 'block';
    }
});
```

---

## Testing Checklist

- [ ] Open website: http://localhost:8000/index.html
- [ ] Fill basic form fields
- [ ] Select "Cloud Computing" track
- [ ] ✅ Self-assessment section appears
- [ ] ✅ 4 Cloud Computing questions visible
- [ ] Change to "Data Science" track
- [ ] ✅ Questions change to Data Science questions
- [ ] Answer all 4 questions
- [ ] Upload test resume
- [ ] Submit form
- [ ] ✅ Success message appears
- [ ] Check Firebase Console → applications collection
- [ ] ✅ New document has `self_assessment` field
- [ ] ✅ All Q&A pairs saved correctly

---

## Customization

### Add More Questions:

1. Open `index.html`
2. Find the track's question section (e.g., `#questions-cloud-computing`)
3. Copy a question block and modify:

```html
<div class="form-group form-group-full">
    <label for="q5_cloud">5. Your new question? *</label>
    <select id="q5_cloud" name="q5_cloud" class="assessment-question">
        <option value="">Select option</option>
        <option value="Option1">Option 1</option>
        <option value="Option2">Option 2</option>
    </select>
</div>
```

### Change Question Text:

Just edit the `<label>` text in `index.html`

### Change Options:

Edit the `<option>` values in the dropdown

---

## Scoring (Optional Enhancement)

You can add a scoring system to automatically rate candidates:

### Point System:
- Q1 (1-5 rating): Direct score (1-5 points)
- Q2 (Checkboxes): 1 point per selection
- Q3 (Dropdown): Map to points (Expert=5, None=0)
- Q4 (Dropdown): Map to points (Built=5, Never=0)

### Total Score Ranges:
- **0-5 points**: Beginner
- **6-10 points**: Basic
- **11-15 points**: Intermediate
- **16-20 points**: Advanced
- **21+ points**: Expert

This can be calculated client-side or during data analysis.

---

## Future Enhancements

### 1. **Conditional Questions**
- Show additional questions based on previous answers
- Example: If user selects "AWS" → Ask "Which AWS services?"

### 2. **Progress Indicator**
- Show "Question 1 of 4", "Question 2 of 4"
- Progress bar

### 3. **Skill Level Badge**
- Calculate score on submit
- Show "Your skill level: Intermediate"

### 4. **Email Integration**
- Include self-assessment answers in email notifications
- Uncomment FormSpree code and add assessment data

### 5. **Analytics Dashboard**
- Build admin page to visualize skill distributions
- Charts showing experience levels per track
- Top skills applicants have

---

## Troubleshooting

### Issue: Questions don't appear
**Solution:**
- Check browser console (F12)
- Verify track dropdown has value
- Check `selfAssessmentSection` is not hidden by CSS

### Issue: Data not saving to Firebase
**Solution:**
- Check Firebase config in `main.js`
- Verify Firestore security rules allow `create`
- Check browser console for errors

### Issue: Required validation not working
**Solution:**
- Ensure `required` attribute is added to visible questions
- Check JavaScript is adding/removing required correctly

---

## Summary

✅ **4 questions per track** (not 17 like in Google Forms)
✅ **Integrated in main form** (no separate forms needed)
✅ **Dynamic & responsive** (shows only relevant questions)
✅ **Saves to Firebase** (all data in one place)
✅ **Easy to analyze** (export to Sheets/CSV)

**Estimated completion time for applicants:** +2 minutes per application

---

## Need Help?

Contact: ganura@gmail.com

**Ready to deploy!** 🚀
