# WiseAdvisor Tech Plan

**Tech Stack:** Astro + Sanity + Cloudflare (Zero-Cost Architecture)

แผนงานฉบับปรับปรุงนี้มุ่งเน้นการสร้างเว็บไซต์ที่เน้นเนื้อหา (Content-driven) ด้วยประสิทธิภาพสูงสุด (Core Web Vitals 100) โดยใช้ระบบไร้เซิร์ฟเวอร์ (Serverless) ทั้งหมด เพื่อสร้างความเชื่อมั่นในฐานะที่ปรึกษาการเงินและประกันมืออาชีพ

## 1. System Architecture Overview

สถาปัตยกรรมแบบ Modern Jamstack ที่แยกส่วนการทำงาน (Decoupled) เพื่อความปลอดภัยและการขยายตัว (Scalability) ในอนาคต

- **Frontend: Astro** - ใช้สำหรับการทำ Static Site Generation (SSG) เพื่อให้ได้ความเร็วสูงสุดและ SEO ที่ยอดเยี่ยม
- **Headless CMS: Sanity.io** - จัดการเนื้อหาบทความและข้อมูลผลิตภัณฑ์ผ่านระบบ Content Lake ที่ยืดหยุ่นสูง
- **Hosting & Edge: Cloudflare Pages** - ให้บริการ Hosting บนเครือข่าย Global CDN พร้อมระบบ SSL และ Security ในตัว
- **Database (Leads): Cloudflare D1** - ระบบ SQL Database (SQLite-based) สำหรับเก็บข้อมูลลูกค้าที่สนใจบริการ
- **Backend Logic: Cloudflare Workers** - สำหรับประมวลผล API และ Logic ต่างๆ ที่ Edge location

## 2. Component Selection Matrix

| Component | Technology | Strategic Reason |
| :--- | :--- | :--- |
| **Frontend** | Astro | มอบประสบการณ์ Zero-JS by default ช่วยให้หน้าบทความโหลดเร็วมาก และคะแนน Lighthouse สูง |
| **CMS** | Sanity.io | กำหนด Schema ผ่าน Code ได้ (Schema-as-Code) ทำให้จัดการ Version Control ได้ง่ายและไม่จำกัด Content Types ใน Free Tier |
| **Backend** | Cloudflare Workers | ทำงานได้เร็ว (Low Latency) และรองรับการทำ Server-side logic โดยไม่ต้องมี Server |
| **Database** | Cloudflare D1 | SQL-native เหมาะสำหรับการเก็บข้อมูลที่มีโครงสร้างชัดเจน เช่น รายชื่อลูกค้า (Leads) |
| **Security** | Cloudflare Turnstile | ระบบป้องกัน Bot ที่ทันสมัยและไม่รบกวนผู้ใช้งาน (User-friendly alternative to reCAPTCHA) |

## 3. Implementation Step-by-Step

### Phase 1: High-Performance CMS Design (Sanity)

เนื่องจากเนื้อหามีความเฉพาะทางสูง การออกแบบ Data Schema จึงเป็นหัวใจสำคัญ:

- **Schema Modeling**: ออกแบบ `schema.js` สำหรับ:
    - `parentingContent`: บทความเกี่ยวกับการเลี้ยงลูกเชิงบวกและการวางแผนกองทุนการศึกษา
    - `insuranceProduct`: ข้อมูลแผนประกันสุขภาพและชีวิต (รองรับตารางเปรียบเทียบ)
    - `legalDigest`: สรุปประเด็นกฎหมายครอบครัวและมรดกที่สำคัญ
    - `macroInsights`: การวิเคราะห์สภาวะเศรษฐกิจประจำสัปดาห์
- **Custom Studio**: ปรับแต่งหน้าจอการกรอกข้อมูล (Sanity Studio) ให้ง่ายต่อการใช้งานและรองรับการทำ Preview ก่อนเผยแพร่

### Phase 2: Content-First Frontend (Astro)

- **Sanity Integration**: เชื่อมต่อ Astro กับ Sanity API เพื่อดึงเนื้อหามาสร้างหน้าเว็บแบบ Static
- **SEO Optimization**: ตั้งค่า Meta tags, Open Graph และ Sitemap อัตโนมัติ เพื่อรองรับการแชร์ลง Social Media
- **Island Components**: ใช้ React สำหรับส่วนที่ต้องมีการโต้ตอบ (Interactive) เช่น เครื่องมือคำนวณเบี้ยประกัน หรือแบบฟอร์มติดต่อสอบถาม
- **Tailwind CSS**: ออกแบบ UI ที่สะอาดตา (Clean & Professional) เน้นการอ่านง่ายทั้งบนมือถือและเดสก์ท็อป

### Phase 3: Lead Generation & Data Storage (Cloudflare D1)

- **API Endpoints**: สร้าง Serverless Function บน Cloudflare เพื่อรับข้อมูลจากฟอร์มหน้าเว็บ
- **D1 Storage**: บันทึกข้อมูลลูกค้า (Leads) ลงใน SQL Database เพื่อความปลอดภัยและง่ายต่อการดึงข้อมูลมาวิเคราะห์
- **Instant Notification**: ตั้งค่าระบบแจ้งเตือนผ่าน Line Notify เมื่อมีลูกค้าส่งคำขอรับคำปรึกษาเข้ามา

## 4. Advance Features (For Developer/PM)

### A. Data-Driven Macro Dashboard

พัฒนาส่วนแสดงผลข้อมูลเศรษฐกิจ โดยดึงข้อมูลตัวเลขสำคัญจากแหล่งข่าว (เช่น Forex Factory) มาวิเคราะห์และแสดงผลเป็นกราฟที่เข้าใจง่าย เพื่อให้คำแนะนำในการจัดพอร์ตลงทุน

### B. Intelligent Image Pipeline

ใช้ระบบจัดการรูปภาพของ Sanity ร่วมกับ Cloudflare เพื่อแปลงไฟล์เป็น WebP/Avif อัตโนมัติ และการใส่ Watermark บนรูปภาพสถิติสำคัญ เพื่อความเป็นมืออาชีพ

## 5. Cost & Security Analysis

- **Monthly Cost**: 0 บาท (ใช้ประโยชน์จาก Free Tier ของ Cloudflare และ Sanity อย่างคุ้มค่า)

### Security:

- **DDoS Protection**: ระดับ Enterprise-grade จาก Cloudflare
- **Data Reliability**: ระบบ Content Lake ของ Sanity มีการทำ Revision History ย้อนหลังได้
- **Privacy**: สอดคล้องกับมาตรฐาน PDPA ในการจัดการข้อมูลส่วนบุคคลของลูกค้า

### Deployment:

ใช้ระบบ CI/CD ผ่าน GitHub Integration - `git push` เพื่ออัปเดตเว็บไซต์ทันที

---
**WiseAdvisor: Smart Planning, Secure Legacy.**
