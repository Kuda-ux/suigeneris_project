# 💻 Laptop Inventory Update - November 2024

## 📋 **What This Does**

Updates your laptop database with:
- ✅ **30 laptop models** (new + existing)
- ✅ **Updated prices** from $100 to $800
- ✅ **4 BRAND NEW laptops** (HP 15 & HP 250 G10 series)
- ✅ **26 Second-hand (Excellent)** laptops
- ✅ **Stock counts** for each model

---

## 🎯 **Price Range**

### **Budget Laptops ($100-$180)**
- Dell Latitude E6420 - $100
- Microsoft Surface SE - $110
- Lenovo X131e/X140e - $115
- Dell Latitude 3150 - $120
- Dell Latitude 3189/90 - $125
- Dell Latitude E6440 - $160
- Lenovo ThinkPad T460 - $180

### **Mid-Range ($220-$370)**
- Acer TravelMate P259 - $220
- HP Pro x2 (2-in-1) - $230
- Toshiba Tecra A50-EC (i5) - $250
- HP EliteBook 850 G3/4 - $250-$260
- Dell Latitude 5290 2-in-1 - $260
- Toshiba Tecra (i7 6th) - $265
- Toshiba Tecra (i7 8th) - $280
- HP EliteBook 840 G5 - $290
- HP EliteBook 840 G3 - $290
- HP EliteBook 850 G5/6 - $310
- Dell Latitude 5410 - $320
- HP EliteBook x360 1030 G3 - $360
- Dell Latitude 7320 - $370

### **Premium ($450-$800)**
- HP EliteBook 850 G7 - $450
- MacBook Pro 2017 - $520
- MacBook Pro 2019 - $580
- **HP 15 (i5 13th Gen) - $600** ⭐ BRAND NEW
- **HP 250 G10 (i5 13th Gen) - $620** ⭐ BRAND NEW
- Dell Latitude 7640 - $750
- Dell Precision 3580 - $750
- **HP 15 (i7 13th Gen) - $780** ⭐ BRAND NEW
- **HP 250 G10 (i7 13th Gen) - $800** ⭐ BRAND NEW

---

## ⚡ **HOW TO RUN**

### **Step 1: Open Supabase**
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **"SQL Editor"**
4. Click **"New Query"**

### **Step 2: Copy & Paste**
1. Open file: `UPDATE_LAPTOP_PRICES_2024.sql`
2. Copy the ENTIRE script
3. Paste into Supabase SQL Editor

### **Step 3: Run**
1. Click **"Run"** (or press F5)
2. Wait for completion (30-60 seconds)
3. Check the results

---

## ✅ **Expected Results**

After running, you should see:

### **Verification Query Results**:
```
30 laptops listed
Prices from $100 to $800
All with stock counts
Brand new and refurbished clearly marked
```

### **Summary**:
```
Total Laptops: 30
Brand New: 4
Refurbished: 26
Total Stock: ~180 units
```

---

## 🔍 **What Gets Updated**

### **Existing Laptops (Price Updates)**:
- HP EliteBook x360 1030 G3 → $360
- HP EliteBook 840 G5 → $290
- HP EliteBook 850 G5/G6 → $310
- HP EliteBook 850 G3/G4 → $250-$260
- HP EliteBook 840 G3 → $290
- Dell Latitude 5410 → $320
- Dell Latitude 7320 → $370

### **New Laptops Added**:
- Dell Latitude E6420 - $100
- Microsoft Surface SE - $110
- Lenovo X131e/X140e - $115
- Dell Latitude 3150 - $120
- Dell Latitude 3189/90 - $125
- Dell Latitude E6440 - $160
- Lenovo ThinkPad T460 - $180
- Acer TravelMate P259 - $220
- HP Pro x2 (2-in-1) - $230
- Toshiba Tecra A50-EC (3 variants) - $250-$280
- Dell Latitude 5290 2-in-1 - $260
- HP EliteBook 850 G7 - $450
- MacBook Pro 2017 - $520
- MacBook Pro 2019 - $580
- HP 15 (i5 & i7 13th Gen) - $600/$780 ⭐ NEW
- HP 250 G10 (i5 & i7 13th Gen) - $620/$800 ⭐ NEW
- Dell Latitude 7640 - $750
- Dell Precision 3580 - $750

---

## 🎯 **Key Features**

### **All Laptops Include**:
- ✅ Accurate pricing
- ✅ Detailed descriptions
- ✅ Processor generation specified
- ✅ RAM & storage clearly listed
- ✅ Condition marked (Brand New or Second-hand Excellent)
- ✅ Stock availability
- ✅ Warranty included

### **Brand New Laptops**:
- HP 15 (Core i5 13th Gen) - $600
- HP 250 G10 (Core i5 13th Gen) - $620
- HP 15 (Core i7 13th Gen) - $780
- HP 250 G10 (Core i7 13th Gen) - $800

All with **full manufacturer warranty**!

---

## 🚨 **Important Notes**

1. **ON CONFLICT clause**: Script uses `ON CONFLICT (name) DO UPDATE`
   - If laptop exists → Updates price
   - If laptop doesn't exist → Adds new entry

2. **Stock Counts**:
   - Budget laptops: 8-10 units
   - Mid-range: 5-8 units
   - Premium: 3-6 units

3. **Descriptions**: All include:
   - Processor details
   - Screen size
   - RAM & storage
   - Condition (Brand New or Second-hand Excellent)

---

## 🔧 **After Running**

### **Verify on Website**:
1. Go to: https://www.suigeneriszim.co.zw/products
2. Filter by "Laptops"
3. Check prices match the list
4. Verify all 30 models appear

### **Check Admin Dashboard**:
1. Go to: /admin
2. Click "Product Management"
3. Filter by category: "Laptops"
4. Verify stock counts
5. Check all details are correct

---

## 📊 **Inventory Summary**

### **By Brand**:
- **HP**: 13 models ($230-$800)
- **Dell**: 10 models ($100-$750)
- **Lenovo**: 2 models ($115-$180)
- **Toshiba**: 3 models ($250-$280)
- **Apple**: 2 models ($520-$580)
- **Acer**: 1 model ($220)
- **Microsoft**: 1 model ($110)

### **By Condition**:
- **Brand New**: 4 models (HP 15 & HP 250 G10 series)
- **Second-hand (Excellent)**: 26 models

### **By Price Range**:
- **Under $200**: 7 models
- **$200-$400**: 14 models
- **$400-$600**: 3 models
- **$600-$800**: 6 models

---

## ✅ **Checklist**

- [ ] Opened Supabase SQL Editor
- [ ] Copied entire SQL script
- [ ] Ran the script successfully
- [ ] Verified 30 laptops in results
- [ ] Checked prices are correct
- [ ] Confirmed stock counts updated
- [ ] Tested on website
- [ ] Verified in admin dashboard
- [ ] All brand new laptops marked correctly
- [ ] All second-hand laptops marked correctly

---

## 🎉 **Success Indicators**

When complete:
- ✅ 30 laptop models in database
- ✅ Prices from $100 to $800
- ✅ 4 brand new laptops clearly marked
- ✅ 26 refurbished laptops
- ✅ All with stock availability
- ✅ Accurate descriptions
- ✅ Ready for customers!

---

**File**: `UPDATE_LAPTOP_PRICES_2024.sql`  
**Time**: 2 minutes to run  
**Result**: Complete laptop inventory updated! 💻✨
