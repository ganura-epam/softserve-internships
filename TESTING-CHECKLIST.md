# Website Testing Checklist

## Test Date: 2026-05-30
## Version: v2.1.0

---

## 🧪 Testing Checklist

### 1. Homepage (index.html)

#### Header & Navigation
- [ ] Logo displays correctly
- [ ] "Home" link is active (highlighted)
- [ ] "About Us" link works
- [ ] Navigation is responsive on mobile

#### Hero Section
- [ ] Hero title displays: "Launch Your Tech Career with SoftServe"
- [ ] "Explore Opportunities" button scrolls to application form

#### Internship Cards
- [ ] All 5 track cards display correctly:
  - [ ] Cloud Computing (purple gradient)
  - [ ] Data Analytics (pink gradient)
  - [ ] Data Science (blue gradient)
  - [ ] Web Development (orange gradient)
  - [ ] Generative AI (teal gradient)
- [ ] Card icons display
- [ ] Skills lists are readable

#### Why SoftServe Section
- [ ] 4 feature boxes display correctly
- [ ] Icons and text are visible

---

### 2. Application Form (Ready to Start Your Journey)

#### Basic Fields
- [ ] **Full Name**: Text input, required, accepts any text
- [ ] **Email Address**: Email input, required, validates email format
- [ ] **Phone Number**: Tel input, required, accepts any format (no auto-formatting)
- [ ] **College/University**: Text input, required
- [ ] **Current Year**: Dropdown, required, 4 options (1st-4th Year BTech)
- [ ] **Preferred Track**: Dropdown, required, 5 options
- [ ] **CGPA**: Text input, required, accepts % or CGPA format

#### Self-Assessment Section (Dynamic)

**Test Cloud Computing:**
- [ ] Select "Cloud Computing" from track dropdown
- [ ] Self-assessment section appears (blue background)
- [ ] 4 questions display:
  1. [ ] Overall cloud computing knowledge (dropdown 1-5)
  2. [ ] Cloud platforms worked with (checkboxes: AWS, Azure, GCP, None)
  3. [ ] Docker experience (dropdown)
  4. [ ] CI/CD experience (dropdown)
- [ ] All questions marked as required
- [ ] Can select multiple checkboxes in Q2

**Test Data Analytics:**
- [ ] Select "Data Analytics" from track dropdown
- [ ] Previous questions disappear
- [ ] New 4 questions display:
  1. [ ] Overall data analytics knowledge (dropdown 1-5)
  2. [ ] SQL experience (dropdown)
  3. [ ] BI Tools experience (checkboxes: Power BI, Tableau, Excel, None)
  4. [ ] Statistical knowledge (dropdown)

**Test Data Science:**
- [ ] Select "Data Science" from track dropdown
- [ ] New 4 questions display:
  1. [ ] Overall data science knowledge (dropdown 1-5)
  2. [ ] Python programming experience (dropdown)
  3. [ ] Python libraries used (checkboxes: NumPy, Pandas, Matplotlib, Scikit-learn, None)
  4. [ ] Machine learning knowledge (dropdown)

**Test Web Development:**
- [ ] Select "Web Development" from track dropdown
- [ ] New 4 questions display:
  1. [ ] Overall web development knowledge (dropdown 1-5)
  2. [ ] JavaScript proficiency (dropdown)
  3. [ ] Frontend frameworks used (checkboxes: React, Angular, Vue, Vanilla, None)
  4. [ ] Backend development experience (checkboxes: Node.js, Express, Python, None)

**Test Generative AI:**
- [ ] Select "Generative AI" from track dropdown
- [ ] New 4 questions display:
  1. [ ] Overall Generative AI knowledge (dropdown 1-5)
  2. [ ] AI models/APIs used (checkboxes: OpenAI, Claude, Gemini, None)
  3. [ ] Prompt engineering experience (dropdown)
  4. [ ] RAG knowledge (dropdown)

#### Resume Upload
- [ ] File upload area displays
- [ ] "Click to upload or drag and drop" text visible
- [ ] Click to open file picker
- [ ] Accepts PDF files
- [ ] Accepts DOC files
- [ ] Accepts DOCX files
- [ ] Rejects other file types (shows alert)
- [ ] Rejects files > 2MB (shows alert)
- [ ] File preview shows after upload
- [ ] Remove button (X) works
- [ ] Drag and drop works
- [ ] Required field validation

#### Message Field
- [ ] Optional textarea displays
- [ ] Accepts any text
- [ ] Not required

#### Submit Button
- [ ] "Submit Application" button displays
- [ ] Button is enabled
- [ ] Button style is correct

---

### 3. Form Submission Flow

#### Validation
- [ ] Cannot submit without filling required fields
- [ ] Browser shows validation messages for empty fields
- [ ] Email field validates email format
- [ ] CGPA field validates pattern
- [ ] Must select a track
- [ ] Must answer all 4 self-assessment questions
- [ ] Must upload resume

#### Submission Process
- [ ] Click "Submit Application"
- [ ] Button changes to "Uploading resume..."
- [ ] Button disabled during upload
- [ ] Button changes to "Uploading to cloud..."
- [ ] No errors in browser console (F12)
- [ ] Success message appears: "✓ Application submitted successfully!"
- [ ] Form resets after success
- [ ] Resume file removed after success
- [ ] Self-assessment section stays visible
- [ ] Page scrolls to success message
- [ ] Page scrolls to top after 3 seconds

#### Error Handling
- [ ] If resume not uploaded: Shows "✗ Please upload your resume"
- [ ] If Cloudinary fails: Shows error message
- [ ] Button re-enables after error
- [ ] Button text returns to "Submit Application"

---

### 4. Firebase Data Storage

#### Check Firebase Console
- [ ] Open: https://console.firebase.google.com/
- [ ] Select project: `softserve-internships`
- [ ] Go to Firestore Database → applications collection
- [ ] Latest document exists
- [ ] Document contains:
  - [ ] `name` field (string)
  - [ ] `email` field (string)
  - [ ] `phone` field (string)
  - [ ] `college` field (string)
  - [ ] `year` field (string)
  - [ ] `track` field (string)
  - [ ] `cgpa` field (string)
  - [ ] `message` field (string or "N/A")
  - [ ] `resume_url` field (Cloudinary URL)
  - [ ] `resume_filename` field (string)
  - [ ] `self_assessment` field (object with q1, q2, q3, q4)
  - [ ] `submitted_at` field (ISO timestamp)
  - [ ] `timestamp` field (Firebase timestamp)

#### Self-Assessment Data Structure
- [ ] `self_assessment` object exists
- [ ] Each answer has `question` and `answer` fields
- [ ] Dropdown answers saved correctly
- [ ] Checkbox answers saved as comma-separated string
- [ ] Example structure:
  ```json
  "self_assessment": {
    "q1": {
      "question": "1. How would you rate...",
      "answer": "3"
    },
    "q2": {
      "question": "2. Which cloud platforms...",
      "answer": "AWS, GCP"
    }
  }
  ```

#### Resume URL
- [ ] Click `resume_url` in Firebase
- [ ] URL opens in new tab
- [ ] File downloads/displays correctly
- [ ] File is accessible (not 401/404 error)

---

### 5. About Page (about.html)

#### Header & Navigation
- [ ] Logo displays correctly
- [ ] "About Us" link is active (highlighted)
- [ ] "Home" link works

#### Company Section
- [ ] Company description displays
- [ ] 3 feature boxes (Mission, Vision, Values)
- [ ] All text readable

#### Location Section
- [ ] Head Office address displays
- [ ] Contact information displays
- [ ] Email: ganura@gmail.com
- [ ] Phone: +91 9845231676
- [ ] Website link works

#### Mentors Section
- [ ] 3 mentor cards display in grid
- [ ] **Anurag Gupta**:
  - [ ] Photo displays (purple gradient)
  - [ ] Title: "Cloud, Full Stack & Data Science Lead"
  - [ ] Description and skills visible
- [ ] **Leena Chandra**:
  - [ ] Photo displays (pink gradient)
  - [ ] Title: "Program Management Lead"
  - [ ] Description and skills visible
- [ ] **Abhay Sinha**:
  - [ ] Photo displays (blue gradient)
  - [ ] Title: "Cloud Infrastructure & Virtualization Expert"
  - [ ] Description and skills visible

#### CTA Section
- [ ] "Ready to Learn from the Best?" section displays
- [ ] "Apply Now" button works
- [ ] Redirects to index.html#apply

#### Footer
- [ ] Logo displays (white)
- [ ] Contact info displays
- [ ] Quick links work
- [ ] Copyright text displays

---

### 6. Responsive Design

#### Desktop (1920x1080)
- [ ] All sections display correctly
- [ ] No horizontal scroll
- [ ] Cards grid properly (3 columns for tracks, mentors)
- [ ] Form is centered and readable

#### Tablet (768x1024)
- [ ] Layout adjusts properly
- [ ] Cards become 2 columns
- [ ] Form fields stack properly
- [ ] Navigation works

#### Mobile (375x667)
- [ ] All content visible
- [ ] Cards stack vertically (1 column)
- [ ] Form inputs full width
- [ ] Text readable
- [ ] Buttons tap-friendly
- [ ] File upload works

---

### 7. Browser Compatibility

#### Chrome
- [ ] All features work
- [ ] No console errors
- [ ] Form submission works
- [ ] File upload works

#### Safari
- [ ] All features work
- [ ] No console errors
- [ ] Form submission works
- [ ] File upload works

#### Firefox
- [ ] All features work
- [ ] No console errors
- [ ] Form submission works
- [ ] File upload works

#### Edge
- [ ] All features work
- [ ] No console errors
- [ ] Form submission works

---

### 8. Performance & Loading

- [ ] Page loads in < 3 seconds
- [ ] Images load properly
- [ ] No broken images (404 errors)
- [ ] Firebase SDK loads
- [ ] No JavaScript errors on page load
- [ ] Smooth scroll animations work
- [ ] Card animations work (fade in on scroll)

---

### 9. Security & Privacy

- [ ] Firebase API keys visible in source (expected - secured by Firestore rules)
- [ ] Cloudinary credentials visible (expected - secured by upload preset)
- [ ] HTTPS enabled on GitHub Pages
- [ ] No sensitive data in browser console
- [ ] Resume files upload to Cloudinary (not exposed in form data)

---

### 10. SEO & Metadata

- [ ] Page title: "SoftServe | Internship Opportunities for BTech Students"
- [ ] Meta description exists
- [ ] Favicon displays in browser tab
- [ ] Alt tags on images
- [ ] Semantic HTML structure

---

## 🐛 Known Issues / Bugs Found

### Critical Issues (Must Fix)
- None found

### Medium Issues (Should Fix)
- None found

### Minor Issues (Nice to Have)
- None found

---

## ✅ Test Results

**Date Tested**: 2026-05-30
**Tested By**:
**Environment**: Local (http://localhost:8000)
**Browser**:
**Pass Rate**: ___%

---

## 📝 Testing Notes

### Test Scenario 1: Full Application Submission
**Steps**:
1. Fill all basic fields
2. Select "Cloud Computing" track
3. Answer all 4 self-assessment questions
4. Upload test resume (PDF, 500KB)
5. Add optional message
6. Submit form

**Expected Result**:
- Form submits successfully
- Success message displays
- Data saved to Firebase with self_assessment field
- Resume URL accessible

**Actual Result**:
- [ ] Pass / [ ] Fail
- Notes:

---

### Test Scenario 2: Track Change Behavior
**Steps**:
1. Select "Cloud Computing" - see 4 questions
2. Answer Q1 and Q2
3. Change track to "Data Science"
4. Check if new questions appear

**Expected Result**:
- Old questions disappear
- New Data Science questions appear
- Previous answers cleared
- All new questions required

**Actual Result**:
- [ ] Pass / [ ] Fail
- Notes:

---

### Test Scenario 3: File Upload Validation
**Steps**:
1. Try uploading TXT file
2. Try uploading 3MB PDF
3. Try uploading valid 1MB PDF

**Expected Result**:
- TXT rejected with alert
- 3MB PDF rejected with alert
- 1MB PDF accepted and preview shown

**Actual Result**:
- [ ] Pass / [ ] Fail
- Notes:

---

### Test Scenario 4: Required Field Validation
**Steps**:
1. Leave all fields empty
2. Click Submit
3. Check browser validation

**Expected Result**:
- Form doesn't submit
- Browser shows "Please fill out this field" for first empty required field

**Actual Result**:
- [ ] Pass / [ ] Fail
- Notes:

---

## 🔧 Recommendations

### Immediate Actions
1. Complete all test scenarios above
2. Check Firebase Console for test data
3. Verify Cloudinary resume URLs work
4. Test on mobile device

### Future Enhancements
1. Add form field tooltips
2. Add loading spinner during upload
3. Add progress indicator for self-assessment (1/4, 2/4, etc.)
4. Add email confirmation to applicants
5. Build admin dashboard to view applications

---

## 📊 Summary

**Total Tests**: ~100
**Passed**:
**Failed**:
**Skipped**:

**Status**: ✅ Ready for Production / ⚠️ Needs Fixes / ❌ Not Ready

---

## 🚀 Deployment Checklist

Before deploying to production:
- [ ] All critical tests pass
- [ ] Firebase configured correctly
- [ ] Cloudinary configured correctly
- [ ] No console errors
- [ ] Tested on multiple browsers
- [ ] Tested on mobile devices
- [ ] Documentation updated
- [ ] Version tagged (v2.1.0)

---

**Next Steps**:
1. Complete manual testing using this checklist
2. Fix any issues found
3. Re-test after fixes
4. Deploy to GitHub Pages
5. Test live site

**Questions/Issues**: Contact ganura@gmail.com
