# index.html 

สร้างหน้าเว็บเพจสำหรับแอพพลิเคชัน Movies App มีการเชื่อมโยงไฟล์ CSS และ JavaScript ให้เว็บเพจมีสไตล์และฟังก์ชันการทำงานของแอพพลิเคชัน

```bash
<link rel="stylesheet" href="style.css">
<script src="script.js"></script>
```

# script.js
**การกำหนดค่าตัวแปรเพื่ออ้างถึงองค์ประกอบต่างๆ ใน HTML**
```bash
const apiUrl='https://api.themoviedb.org/3/search/movie?api_key=9b823426f94815aebe5d23e2073a1626&query=a';
const IMAG = 'https://image.tmdb.org/t/p/w500/';
const main = document.querySelector('#main');
const form = document.querySelector('#from')
const search = document.querySelector('#search')
```

**ฟังก์ชัน showMovies แสดงรายการหนังบนหน้าเว็บเพจโดยใช้ข้อมูลจาก API**

- การประกาศฟังก์ชัน showMovies รับพารามิเตอร์ apiUrl เป็น URL ของ API ที่ใช้ในการดึงข้อมูลหนัง เก็บข้อมูลใน response
- การใช้ await กับ fetch ทำให้โค้ดรอจนกว่าเสร็จสมบูรณ์ แล้วจึงไปทำงานอย่างอื่น และเก็บผลลัพธ์ไว้ในตัวแปร movie
- ใช้เมธอด forEach เพื่อวนลูปผ่านรายการหนังแต่ละเรื่อง
- ตัวแปร movieEl สร้าง div ในหน้า HTML ซึ่งจะใช้สำหรับแสดงข้อมูลของหนังแต่ละเรื่อง
- ตัวแปร title สร้าง h2 ในหน้า HTML ซึ่งจะใช้สำหรับแสดงชื่อหนัง
- ตัวแปร poster สร้างimg ในหน้า HTML ซึ่งจะใช้สำหรับแสดงรูปภาพหนัง
- title.innerHTML กำหนดข้อความใน title ให้เป็นชื่อของหนังโดยใช้ข้อมูลจากออบเจกต์ data
- poster.src กำหนด URL ของรูปภาพหนังใน poster โดยรวมกับ URL ของรูปภาพด้วยตัวแปร IMAG และ poster_path จากออบเจกต์ data
- appendChild() เพิ่ม title และ poster เข้าไปยัง movieEl ซึ่งเป็นองค์ประกอบหลักสำหรับแสดงข้อมูลหนัง
- เพิ่ม movieEl (ประกอบด้วยชื่อหนังและรูปภาพ) เข้าไปยัง main
- showMovies(apiUrl); เรียกใช้ฟังก์ชัน showMovies โดยส่ง apiUrl เป็นพารามิเตอร์ เพื่อแสดง

```bash
async function showMovies(apiUrl) {
    const response = await fetch(apiUrl);     
    const movie = await response.json();
    
    movie.results.forEach(data =>{
        const movieEl=document.createElement('div');
        const title= document.createElement('h2');
        const poster=document.createElement('img')
        title.innerHTML=`${data.title}`;
        poster.src=`${IMAG}${data.poster_path}`;
        movieEl.appendChild(title);
        movieEl.appendChild(poster);
        main.appendChild(movieEl);
    });

}

showMovies(apiUrl);

```
 **การทำ search** 

การควบคุมการส่งฟอร์มค้นหาหนังในหน้าเว็บ โดยไม่ต้องโหลดหน้าเว็บใหม่และแสดงผลลัพธ์ค้นหาในส่วน main ของหน้าเว็บเพจ
- เพิ่มฟังก์ชันการจัดการเหตุการณ์ (event listener) ลงใน form ในหน้าเว็บเพจ โดยจะทำงานเมื่อฟอร์มถูกส่ง (submit)
- e.preventDefault() ถูกใช้เพื่อป้องกันพฤติกรรมเริ่มต้นของฟอร์มในการส่งคำขอ HTTP และโหลดหน้าเว็บใหม่ เมื่อฟอร์มถูกส่ง  ซึ่งในที่นี้ไม่ต้องการให้เกิดการโหลดหน้าเว็บใหม่.
- ทำการ reset main ให้เป็นค่าว่าง เวาลากด submit ไปแล้ว จากนั้นจะให้ข้อมูลที่ search ปรากฎมาแทน
- สร้างตัวแปร searchM เก็บค่าจากช่อง search นี่คือการดึงค่าจาก search เพื่อนำไปค้นหาหนัง
- ตรวจสอบว่าค่าในตัวแปร searchM เริ่มการค้นหาหนังด้วยฟังก์ชัน showMovies โดยการสร้าง URL ใหม่โดยรวมกับคำค้นหา (apiUrl+searchM) และเรียกใช้ showMovies ด้วย URL ใหม่
- หลังจากชื่อหนังปรากฎ จะทำการ reset ในช่องค้นหา (search) 

```bash
form.addEventListener('submit',e =>{
    e.preventDefault();
    main.innerHTML ='';

    const searchM = search.value;

    if (searchM) {
        showMovies(apiUrl+searchM);
        search.value='';
    }
})
```
