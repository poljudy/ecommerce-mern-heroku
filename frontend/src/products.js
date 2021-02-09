const products = [
  {
    _id: '1',
    name: "Airpods אוזניות בלוטות' אלחוטיות",
    image: '/images/airpods.jpg',
    description:
      'בעלות שבב H1 המתחבר בצורה אוטומטית ומאפשר תכנות קל למכשירי Apple. בעלות סינון רעשים אקטיבי.  מאפשרות מענה לשיחה/העברת שירים באמצעות הקשה כפולה על האוזנייה. עמידות בפני זיעה ומים - תומכות בתקן iPX4. Siri בתמיכה קולית מלאה.',
    brand: 'Apple',
    category: 'Electronics',
    price: '999.99',
    countInStock: 10,
    rating: 4.5,
    numReviews: 12,
  },
  {
    _id: '2',
    name: 'iPhone 11 Pro זיכרון 256GB',
    image: '/images/phone.jpg',
    description:
      'טלפון סלולרי אייפון Apple iPhone 11 128GB בצבע לבן, שנה אחריות היבואן הרשמי.',
    brand: 'Apple',
    category: 'Electronics',
    price: '4,999.99',
    countInStock: 7,
    rating: 4.0,
    numReviews: 8,
  },
  {
    _id: '3',
    name: 'מצלמת Cannon EOS 80D DSLR',
    image: '/images/camera.jpg',
    description:
      'מצלמת ריפלקס מבית Canon. בעלת 24.2 מגה פיקסל, צג 3 אינץ´,Wi-Fi ו-NFC לשיתוף מהיר וצילום וידיאו FULL HD.',
    brand: 'Cannon',
    category: 'Electronics',
    price: '3,599.99',
    countInStock: 5,
    rating: 3,
    numReviews: 12,
  },
  {
    _id: '4',
    name: 'סוני פלייסטשן 4 Pro White Version',
    image: '/images/playstation.jpg',
    description:
      'PlayStation מבית סוני הינה קונסולת המשחקים הנמכרת בעולם ובישראל מעל לשני עשורים! בזכות גרפיקה פורצת דרך וטכנולוגיות מרשימות. שחקו און ליין עם חברים או בבית, בחרו ממאות המשחקים וגלו עולמות חדשים של פנטזיה, הרפתקאות , ספורט ולחימה עם דמויות שכבר מזמן הפכו לאייקוניות.',
    brand: 'Sony',
    category: 'Electronics',
    price: '1,699.99',
    countInStock: 11,
    rating: 5,
    numReviews: 12,
  },
  {
    _id: '5',
    name: 'עכבר גיימינג Logitech G-Series',
    image: '/images/mouse.jpg',
    description:
      'עכבר גיימינג אלחוטי מבית Logitech בעל כפתור שליטה ברמת ה-DPI ורזולוציה של 12,000DPI.',
    brand: 'Logitech',
    category: 'Electronics',
    price: '249.99',
    countInStock: 7,
    rating: 3.5,
    numReviews: 10,
  },
  {
    _id: '6',
    name: 'רמקול חכם Amazon Echo DOT 3rd generation',
    image: '/images/alexa.jpg',
    description:
      'הכירו את Echo Dot, הרמקול החכם הפופולרי ביותר שלנו עם עיצוב בד. זהו הרמקול החכם הקטן ביותר שלנו ומשתלב בצורה מושלמת לחללים קטנים.',
    brand: 'Amazon',
    category: 'Electronics',
    price: '29.99',
    countInStock: 0,
    rating: 4,
    numReviews: 12,
  },
]

export default products
