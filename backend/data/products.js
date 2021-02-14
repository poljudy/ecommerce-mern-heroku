const products = [
  {
    name: 'Sony PlayStation 5 825GB Blu-ray סוני',
    image: '/images/playstation.jpg',
    description:
      'קונסולת הדור הבא כבר כאן! חוויית משחק חדשה בפתח! גרפיקה מדהימה ברזולוציית 4K ו- 8K בתמיכה מלאה עם HDR וקצב ריענון תמונה של עד FPS 120.',
    brand: 'Sony',
    category: 'Electronics',
    price: 4299.99,
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    name: 'iPhone 12 Pro 256GB Apple',
    image: '/images/phone.jpg',
    description:
      'האייפון החדש מבית Apple בעל המפרט החזק והמגוון - להנות משילוב של הטכנולוגיה המתקדמת ביותר עם עיצוב מרשים בצבעים מדהימים. המכשיר שיהפוך כל פעולה לפשוטה יותר עבורכם!',
    brand: 'Apple',
    category: 'Electronics',
    price: 4999.99,
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    name: 'Samsung Galaxy S20 PLUS SM-G985F/DS 128GB 8GB RAM סמסונג',
    image: '/images/samsung.jpg',
    description:
      'מכשיר זה הנו מכשיר חדש ומקורי וכולל עברית מלאה, עדכוני FOTA ו 12 חודשי אחריות.',
    brand: 'Samsung',
    category: 'Electronics',
    price: 2540,
    countInStock: 15,
    rating: 4.5,
    numReviews: 19,
  },
  {
    name: 'מושב גיימרים Dragon Olympus Chair',
    image: '/images/chair.jpg',
    description:
      'Olympus Chair, הנו מושב גיימינג יוקרתי ואיכותי מבית מותג הגיימינג המשובח Dragon, בראש ובראשונה פותח מושב הגיימינג Olympus נבנה תוך הדרישה ההולכת וגוברת של גיימרים לנוחות מקסימלית גם לאחר שעות ישיבה מרובות ובדיוק זו הסיבה שחלקו הפנימי עשוי מספוג זיכרון ייחודי לצד מראה סקסי וצעיר הופך אותו לרהיט עיצובי ואקסקלוסיבי בחדר/משרד.',
    brand: 'Dragon',
    category: 'Gaming',
    price: 699.99,
    countInStock: 6,
    rating: 4.5,
    numReviews: 18,
  },
  {
    name: 'שולחן גיימינג מתכוונן Cougar Mars',
    image: '/images/table.jpg',
    description:
      'Mars מבית מותג הגיימינג Cougar הנו שולחן גיימינג מקצועי מתכוונן ( ניתן לשנות גובה על פי נוחות ורצון המשתמש ) בעל עיצוב ארגונומי עם קצוות ופינות מעוגלות, דבר המעניק למשתמש חווית משחק אולטימטיבית ונוחוה במיוחד וכל זאת לצד משטח משובח הכולל מרקם סיבי פחמן, בסיס מתכת וגודל של 150 ס"מ.',
    brand: 'Cougar',
    category: 'Gaming',
    price: 1499.99,
    countInStock: 4,
    rating: 4,
    numReviews: 12,
  },
  {
    name: "מחשב גיימינג+מסך 24 אינצ'+ערכת גיימינג RGB",
    image: '/images/computer.jpg',
    description:
      'ערכת הגיימינג המושלמת הכוללת מסך מחשב גיימינג 24 אינצ’ קעור מבית MAG דגם C24S, סט RGB הכולל עכבר, משטח לעכבר, אוזניות ומקלדת צבעוניים וגם מערכת הפעלה WIN10, מבצע לזמן מוגבל!',
    brand: 'N/A',
    category: 'Gaming',
    price: 4459.99,
    countInStock: 10,
    rating: 5,
    numReviews: 22,
  },
  {
    name:
      'מחשב גיימינג Intel i5 10600KF, כ.מסך RTX3070 iChill x4 C30704-08D6X, זכרון 16GB, כונן 1T SSD, לוח BioStar Z490A-Silver ATX - דגם ITS009',
    image: '/images/gaming.jpg',
    description:
      'הכירו את ITS009, מחשב גיימינג מקצועי הכולל מארז Xigmatek Perseus 5×120mm RGB + Remote צבעוני וייחודי בשילוב מפרט טכני מצוין כגון: מעבד  Intel Core i5-10600KF דור 10 חזק ועוצמתי, לוח BioStar Z490A-Silver ATX, יחידת קירור ID Cooling AURAFLOW 240 RGB, זיכרון פנימי של G.Skill DDR4 F4-3600C16D-32GTZRC 16GB, כרטיס מסך יוקרתי GeForce INNO3D RTX3070 iChill x4 C30704-08D6X, כונן פנימי NeTac SSD N950E Pro NVMe 1TB R/W:3500/3000 SLC Caching, אחריות יבואן ל 36 חודשים.',
    brand: 'N/A',
    category: 'Gaming',
    price: 7459.99,
    countInStock: 10,
    rating: 5,
    numReviews: 11,
  },
  {
    name: 'מפצל USB עם מנהל כבל לעכבר Dragon Mouse Chrd Manger',
    image: '/images/manager.jpg',
    description:
      'Mouse Chrd Manger הנו מפצל USB ייחודי מבית מותג היוקרה Dragon המשלב מנהל כבל לעכבר דבר שיהפוך את יכולת השליטה שלך לטובה פי כמה וכמה ועל הדרך ישפר את חוות השימוש ויהפוך אותה לאולטימטיבית מתמיד, עוד תוכלו למצוא ב Mouse Chrd Manger בסיס ייחודי המונע החלקה ומעניק יכולת שליטה מוחלטת בעכבר ללא הפרעה של הכבל, מפצל USB בעל 3 חיבורים התומכים בטכנולוגיית העברת מידע ומאפשרים חיבור עכבר ועוד.',
    brand: 'Dragon',
    category: 'Gaming',
    price: 69,
    countInStock: 26,
    rating: 4.5,
    numReviews: 10,
  },
  {
    name: "Airpods אוזניות בלוטות' אלחוטיות",
    image: '/images/airpods.jpg',
    description:
      'בעלות שבב H1 המתחבר בצורה אוטומטית ומאפשר תכנות קל למכשירי Apple. בעלות סינון רעשים אקטיבי.  מאפשרות מענה לשיחה/העברת שירים באמצעות הקשה כפולה על האוזנייה. עמידות בפני זיעה ומים - תומכות בתקן iPX4. Siri בתמיכה קולית מלאה.',
    brand: 'Apple',
    category: 'Electronics',
    price: 999.99,
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    name: 'מצלמת Canon EOS 80D DSLR',
    image: '/images/camera.jpg',
    description:
      'מצלמת ריפלקס מבית Canon. בעלת 24.2 מגה פיקסל, צג 3 אינץ´,Wi-Fi ו-NFC לשיתוף מהיר וצילום וידיאו FULL HD.',
    brand: 'Cannon',
    category: 'Electronics',
    price: 2199.99,
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    name: 'עכבר גיימינג Logitech G-Series',
    image: '/images/mouse.jpg',
    description:
      'עכבר גיימינג אלחוטי מבית Logitech בעל כפתור שליטה ברמת ה-DPI ורזולוציה של 12,000DPI.',
    brand: 'Logitech',
    category: 'Electronics',
    price: 249.99,
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    name: 'רמקול חכם Amazon Echo DOT 3rd generation',
    image: '/images/alexa.jpg',
    description:
      'הכירו את Echo Dot, הרמקול החכם הפופולרי ביותר שלנו עם עיצוב בד. זהו הרמקול החכם הקטן ביותר שלנו ומשתלב בצורה מושלמת לחללים קטנים.',
    brand: 'Amazon',
    category: 'Electronics',
    price: 29.99,
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
]

export default products
