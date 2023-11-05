const {
  UaCatalogForHotelier,
  RuCatalogForHotelier,
  PlCatalogForHotelier,
  EnCatalogForHotelier,
} = require("../../models");
const { pageCatalog } = require("../../utils");
require("dotenv").config();

const { MAIN_DOMAIN } = process.env;

const CyrillicToTranslit = require("cyrillic-to-translit-js");
const cyrillicToTranslit = new CyrillicToTranslit();

const createNewPages = async (req, res) => {
  const { language, idLocation, district, city, state, country } = req.body;

  const title = {
    ru: [
      // `Продажа бронирования отелей и посуточной аренды жилья - ${city}, ${country} | Your Price Booking - лучшие условия для отельеров.`,
      // `Сдача номера в мотеле с Your Price Booking | ${city}, ${country}`,
      // `Сдача капсульных номеров с Your Price Booking | ${city}, ${country}`,
      // `Сдача номеров в Guest House с Your Price Booking | ${city}, ${country}`,
      // `Сдача комнаты в доме посуточно с Your Price Booking | ${city}, ${country}`,
      // `Сдача комнат посуточно | ${city}, ${country} | самый удобный онлайн сервис Your Price Booking`,
      // `Гибкие условия аренды мест в хостеле с Your Price Booking | ${city}, ${country}`,
      `Гибкие условия сдачи номеров в вашем отеле с Your Price Booking | ${city}, ${country}`,
      `Гибкий и выгодный способ сдачи номеров в гостинице с Your Price Booking | ${city}, ${country}`,
    ],
    uk: [
      // `Продаж бронювання готелів та добової оренда житла - ${city}, ${country} | Your Price Booking - найкращі умови для готельєрів.`,
      // `Здати номера в мотелі з Your Price Booking | ${city}, ${country}`,
      // `Продаж бронювання капсульних номерів через Your Price Booking | ${city}, ${country}`,
      // `Продаж бронювання номерів у Guest House з Your Price Booking | ${city}, ${country}`,
      // `Здати в оренду кімнату в будинку подобово з Your Price Booking | ${city}, ${country}`,
      // `Продаж бронювання кімнат подобово | ${city}, ${country} | найзручніший онлайн сервіс Your Price Booking`,
      // `Гнучкі умови оренди місць у хостелі з Your Price Booking | ${city}, ${country}`,
      `Гнучкі умови здачі номерів у вашому готелі Your Price Booking | ${city}, ${country}`,
      `Гнучкий та вигідний спосіб здачі номерів у готелях всіх типів Your Price Booking | ${city}, ${country}`,
    ],
    pl: [
      // `Sprzedaż, rezerwacje hoteli i dobowy wynajem mieszkań - ${city}, ${country} | Your Price Booking - najlepsze warunki dla hotelarzy.`,
      // `Zarezerwuj pokoje motelowe z Your Price Booking | ${city}, ${country}`,
      // `Sprzedaż rezerwacji pokoi kapsułowych za pośrednictwem Your Price Booking | ${city}, ${country}`,
      // `Sprzedaż rezerwacji pokoi w pensjonacie z Your Price Booking | ${city}, ${country}`,
      // `Wynajmij pokój w swoim domu na dobę z Your Price Booking | ${city}, ${country}`,
      // `Sprzedaż dziennych rezerwacji pokoi | ${city}, ${country} | najwygodniejsza usługa online Twoja cena Rezerwacja`,
      // `Elastyczne warunki wynajmu łóżek hostelowych z Your Price Booking | ${city}, ${country}`,
      `Elastyczne warunki wynajmu pokoi w Twoim hotelu dzięki Your Price Booking | ${city}, ${country}`,
      `Elastyczny i opłacalny sposób wynajmu pokoi we wszelkiego rodzaju hotelach dzięki Your Price Booking | ${city}, ${country}`,
    ],
    en: [
      // `Sales, hotel reservations and daily rental housing - ${city}, ${country} | Your Price Booking - the best conditions for hoteliers.`,
      // `Book motel rooms with Your Price Booking | ${city}, ${country}`,
      // `Selling capsule room bookings through Your Price Booking | ${city}, ${country}`,
      // `Sale of guest house room reservations with Your Price Booking | ${city}, ${country}`,
      // `Rent a room on a daily basis with Your Price Booking | ${city}, ${country}`,
      // `Sale of daily room reservations | ${city}, ${country} | the most convenient online service Your Price Booking`,
      // `Flexible conditions for renting hostel beds with Your Price Booking | ${city}, ${country}`,
      `Flexible conditions for renting rooms in your hotel with Your Price Booking | ${city}, ${country}`,
      `A flexible and profitable way to rent out rooms in hotels of all types with Your Price Booking | ${city}, ${country}`,
    ],
  };

  const description = {
    ru: [
      // `Сдайте жилье посуточно ${city}, ${country} с Your Price Booking и получайте оплату перед заселением. 5% комиссии, гибкие цены, регистрация объектов онлайн. Удовлетворите потребности бронирующих гостей, предлагая индивидуальные цены. Привлекайте путешественников, знающих, что наши комиссии для отельеров минимальны. Регистрируйте отели, квартиры, дома и многое другое сегодня и привлекайте клиентов! Лучшие условия для отельеров онлайн на сервисе бронирования Your Price Booking.`,
      // `Сдайте номер в вашем мотеле в локации ${city}, на ваших условиях с Your Price Booking. Получайте оплату до заселения, и наша комиссия составляет всего 5%. У вас есть полный контроль над ценами, и вы можете предлагать индивидуальные предложения конфиденциально. Видите всех пользователей, заинтересованных в вашей аренде, и создавайте акционные предложения. Путешественники знают, что мы предлагаем минимальные комиссии отелям и ожидают от вас выгодных цен. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте свой мотель прямо сейчас, пройдите онлайн-верификацию, и начните привлекать новых клиентов. Регистрация займет всего 2 минуты.`,
      // `Сдайте свои капсульные номера в Capsule Hotel на ваших условиях с Your Price Booking | ${city}. Получайте оплату до заселения, наша комиссия составляет всего 5%. У вас есть полный контроль над ценами, и вы можете предлагать индивидуальные предложения конфиденциально. Видите всех пользователей, создавайте акционные предложения безплатно. Путешественники знают, что мы предлагаем минимальные комиссии отелям и ожидают от вас выгодных цен. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте ваш Capsule Hotel прямо сейчас, пройдите онлайн-верификацию, и начните привлекать новых клиентов. Регистрация займет всего 2 минуты.`,
      // `Сдайте номера в вашем Guest House с Your Price Booking  | ${city}, ${country} на ваших условиях. Получайте оплату до заселения. Регистрация займет 2 минуты. Наша комиссия составляет всего 5%. У вас есть полный контроль над ценами, и вы можете предлагать индивидуальные предложения конфиденциально. Видите всех пользователей, заинтересованных в вашей аренде, и создавайте акционные предложения. Путешественники знают, что мы предлагаем минимальные комиссии отелям и ожидают от вас выгодных цен. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте свой Guest House прямо сейчас, пройдите онлайн-верификацию и начните привлекать новых клиентов.`,
      // `Сдайте комнату в вашем доме посуточно — ${city}, на ваших условиях с Your Price Booking. Получайте оплату до заселения, а наша комиссия составляет всего 5%. У вас есть полный контроль над ценами, и вы можете предлагать индивидуальные предложения конфиденциально. Видите всех пользователей, заинтересованных в вашей аренде, и создавайте акционные предложения. Путешественники знают, что мы предлагаем минимальные комиссии отелям и ожидают от вас выгодных цен. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте комнату в доме или любой другой объект жилой недвижимости прямо сейчас, пройдите онлайн-верификацию, и начните привлекать новых клиентов. Регистрация займет всего 2 минуты.`,
      // `Сдайте комнату в квартире посуточно - ${city}, ${country}, с оплатой перед заселением. Мы взимаем всего 5% комиссии и позволяем вам гибко управлять ценами. Зарегистрируйте свое жилье онлайн и получите клиентов. Предлагайте индивидуальные цены, видимые для ищущих бронирование. Не упустите возможность предложить хорошие цены и получить клиентов с минимальной комиссией. Регистрируйтесь и начните аренду жилья прямо сейчас.`,
      // `Сдайте место в вашем хостеле  | ${city}, ${country} — на ваших условиях с Your Price Booking. Получайте оплату до заселения, а наша комиссия всего 5%. Управляйте ценами по вашему усмотрению и предлагайте индивидуальные предложения для каждого клиента. У вас есть возможность видеть всех пользователей, интересующихся вашими свободными местами, и делать акционные предложения. Путешественники знают, что мы предлагаем отельерам минимальные комиссии, и ожидают от вас выгодные цены. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте ваш хостел на нашем сайте, пройдите онлайн-верификацию и начните продавать через наш сервис.`,
      `Сдайте номер в вашем отеле в городе ${city} на ваших условиях с Your Price Booking. Получайте оплату до заселения, а наша комиссия всего 5%. Управляйте ценами по вашему усмотрению и предлагайте индивидуальные предложения для каждого клиента. У вас есть возможность видеть всех пользователей, интересующихся вашими свободными номерами, и делать акционные предложения. Путешественники знают, что мы предлагаем отельерам минимальные комиссии, и ожидают от вас выгодные цены. У нас нет принципа паритета цен, только гибкость и прозрачность. Зарегистрируйте свой отель прямо сейчас, пройдите онлайн-верификацию и начните привлекать новых клиентов.`,
      `Оптимизируйте свой бизнес с помощью Your Price Booking - сервиса бронирования гостиниц и посуточной оренды жилья. У нас вы сдаете номера на ваших условиях, видите всех пользователей, которым подходят ваши предложения, и предлагаете индивидуальные цены конфиденциально. Отельеры платят всего 5% комиссии с каждой сделки и могут менять цены по своему усмотрению. Нет паритета цен - только гибкость и прозрачность. Регистрируйтесь сейчас, проходите верификацию онлайн и привлекайте новых клиентов.`,
    ],
    uk: [
      // `Здавайте житло добово - ${city}, ${country} за допомогою Your Price Booking. Отримуйте оплату перед заселенням. 5% комісії, гнучкі ціни, реєстрація об'єктів онлайн. Задовольняйте потреби бронюючих гостей, запропоновуючи індивідуальні ціни. Привертайте подорожуючих, які знають, що наші комісії для господарів є мінімальними. Реєструйте готелі, квартири, будинки та багато іншого вже сьогодні і приваблюйте клієнтів! Найкращі умови для готельєрів тіки на онлайн сервісі бронювання Your Price Booking.`,
      // `Здайте номер у вашому мотелі у локації ${city}, на ваших умовах із Your Price Booking. Отримуйте оплату до заселення, і наша комісія складає лише 5%. Ви маєте повний контроль над цінами, і ви можете пропонувати індивідуальні пропозиції конфіденційно. Бачіть усіх користувачів, зацікавлених у вашій оренді, та створюйте акційні пропозиції. Мандрівники знають, що ми пропонуємо мінімальні комісії готелям та очікують від вас вигідних цін. У нас немає принципу паритету цін, лише гнучкість та прозорість. Зареєструйте свій мотель прямо зараз, пройдіть онлайн-верифікацію і почніть залучати нових клієнтів. Реєстрація займе лише 2 хвилини.`,
      // `Здайте свої капсули в Capsule Hotel на ваших умовах з Your Price Booking | ${city}. Отримуйте оплату до заселення, наша комісія складає лише 5%. Ви маєте повний контроль над цінами, і ви можете пропонувати індивідуальні пропозиції конфіденційно. Бачите всіх користувачів, створюйте акційні пропозиції безкоштовно. Мандрівники знають, що ми пропонуємо мінімальні комісії готелям та очікують від вас вигідних цін. У нас немає принципу паритету цін, лише гнучкість та прозорість. Зареєструйте ваш Capsule Hotel прямо зараз, пройдіть онлайн-верифікацію і почніть залучати нових клієнтів. Реєстрація займе лише 2 хвилини.`,
      // `Оренда номерів у Вашому Гостьовому Домі з Your Price Booking | ${city}, ${country} на ваших умовах. Отримайте оплату перед заселенням. Реєстрація займе 2 хвилини. Наша комісія становить лише 5%. Ви маєте повний контроль над цінами та можете конфіденційно пропонувати індивідуальні пропозиції. Переглядайте всіх користувачів, зацікавлених у вашій оренді, і створюйте рекламні пропозиції. Мандрівники знають, що ми пропонуємо мінімальні комісії готелям і очікуємо від вас чудових цін. У нас немає принципу паритету цін, лише гнучкість і прозорість. Зареєструйте свій Гостьовий будинок прямо зараз, пройдіть онлайн-верифікацію та починайте залучати нових клієнтів.`,
      // `Здайте мандрівникам кімнату у своєму будинку подобово – ${city}, на ваших умовах за вашою ціною бронювання. Отримайте оплату до заселення і наша комісія складає всього 5%. Ви маєте повний контроль над цінами та можете конфіденційно пропонувати персоналізовані пропозиції. Переглядайте всіх користувачів, зацікавлених у вашій оренді, та створюйте рекламні пропозиції безкоштовно та без обмежень. Мандрівники знають, що ми пропонуємо мінімальні комісії готелям та очікуємо від вас відмінних цін. У нас немає принципу паритету цін, є лише гнучкість та прозорість. Зареєструйте кімнату у своєму будинку або іншому житловому об'єкті прямо зараз, пройдіть онлайн-перевірку та почніть залучати нових клієнтів. Реєстрація займе лише 2 хвилини.`,
      // `Здайте кімнату в квартирі добово - ${city}, ${country}, з оплатою перед заселенням. Ми беремо лише 5% комісії та надаємо можливість гнучкого керування цінами. Зареєструйте своє житло онлайн та отримайте клієнтів. Пропонуйте індивідуальні ціни, видимі для тих, хто шукає бронювання. Не пропустіть можливість запропонувати хороші ціни та отримати клієнтів з мінімальною комісією. Реєструйтеся і почніть здачу житла прямо зараз.`,
      // `Здайте місце у вашому хостелі ${city}, ${country} — на ваших умовах із Your Price Booking. Отримуйте оплату до заселення, а наша комісія лише 5%. Керуйте цінами на ваш розсуд і пропонуйте індивідуальні пропозиції для кожного клієнта. Ви можете бачити всіх користувачів, які цікавляться вашими вільними місцями, і робити акційні пропозиції. Мандрівники знають, що ми пропонуємо готельєрам мінімальні комісії, і очікують від вас вигідні ціни. У нас немає принципу паритету цін, лише гнучкість та прозорість. Зареєструйте ваш хостел на нашому сайті, пройдіть онлайн-верифікацію та почніть продавати через наш сервіс.`,
      `Здайте номер у вашому готелі на ваших умовах із Your Price Booking | ${city}. Отримуйте оплату до заселення, а наша комісія лише 5%. Керуйте цінами на ваш розсуд і пропонуйте індивідуальні пропозиції для кожного клієнта. Ви можете бачити всіх користувачів, які цікавляться вашими вільними номерами, і робити акційні пропозиції. Мандрівники знають, що ми пропонуємо готельєрам мінімальні комісії, і очікують від вас вигідні ціни. У нас немає принципу паритету цін, лише гнучкість та прозорість. Зареєструйте свій готель зараз, пройдіть онлайн-верифікацію і почніть залучати нових клієнтів.`,
      `Оптимізуйте свій бізнес за допомогою Your Price Booking – сервісу бронювання готелів усіх типів тадобової оренди житла. У нас ви здаєте номери на ваших умовах, бачите всіх користувачів, яким підходять ваші пропозиції, та пропонуєте індивідуальні ціни конфіденційно. Готельєри платять лише 5% комісії з кожної угоди і можуть змінювати ціни на власний розсуд. Немає паритету цін – лише гнучкість та прозорість. Реєструйтеся зараз, проходьте верифікацію онлайн та залучайте нових клієнтів.`,
    ],
    pl: [
      // `Wynajmij apartamenty na dzień - ${city}, ${country} z Your Price Booking i zarabiaj przed wprowadzeniem się. 5% prowizji, elastyczne ceny, rejestracja obiektu online. Spełniaj potrzeby rezerwacyjne swoich gości, oferując spersonalizowane ceny. Przyciągaj podróżnych, którzy wiedzą, że opłaty naszych właścicieli są minimalne. Wystaw hotele, apartamenty, domy i nie tylko już dziś i przyciągnij klientów! Najlepsze warunki dla hotelarzy w serwisie rezerwacji online Your Price Booking.`,
      // `Wynajmij pokój w swoim motelu w lokalizacji ${city}, na swoich warunkach z Your Price Booking. Otrzymaj płatność przed wprowadzeniem się, a nasza prowizja wynosi tylko 5%. Masz pełną kontrolę nad cenami i możesz z zachowaniem poufności oferować spersonalizowane oferty. Zobacz wszystkich użytkowników zainteresowanych Twoim wynajmem i twórz oferty promocyjne. Podróżni wiedzą, że oferujemy hotelom minimalne prowizje i oczekują od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj swój motel już teraz, przejdź weryfikację online i zacznij pozyskiwać nowych klientów. Rejestracja zajmie tylko 2 minuty.`,
      // `Wynajmij pokoje kapsułowe w Capsule Hotel na swoich warunkach z Your Price Booking | ${city}. Otrzymaj płatność przed wprowadzeniem się, nasza prowizja wynosi tylko 5%. Masz pełną kontrolę nad cenami i możesz z zachowaniem poufności oferować spersonalizowane oferty. Zobacz wszystkich użytkowników, twórz oferty promocyjne za darmo. Podróżni wiedzą, że oferujemy hotelom minimalne prowizje i oczekują od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj swój Hotel Kapsułowy już teraz, przejdź weryfikację online i zacznij pozyskiwać nowych klientów. Rejestracja zajmie tylko 2 minuty.`,
      // `Wynajmij pokoje w swoim pensjonacie z Your Price Booking | ${city}, ${country} na Twoich warunkach. Otrzymaj płatność przed wprowadzeniem się. Rejestracja zajmie 2 minuty. Nasza prowizja wynosi tylko 5%. Masz pełną kontrolę nad cenami i możesz z zachowaniem poufności oferować spersonalizowane oferty. Zobacz wszystkich użytkowników zainteresowanych Twoim wynajmem i twórz oferty promocyjne. Podróżni wiedzą, że oferujemy hotelom minimalne prowizje i oczekują od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj swój Pensjonat już teraz, przejdź weryfikację online i zacznij pozyskiwać nowych klientów.`,
      // `Wynajmij pokój w swoim domu podróżującym codziennie - ${city}, na Twoich warunkach i za cenę rezerwacji. Otrzymaj płatność przed wprowadzeniem się, a nasza prowizja wynosi tylko 5%. Masz pełną kontrolę nad cenami i możesz prywatnie oferować spersonalizowane oferty. Przeglądaj wszystkich użytkowników zainteresowanych Twoim wynajmem i twórz oferty promocyjne. Podróżni wiedzą, że oferujemy hotelom minimalne prowizje i oczekują od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj pokój w swoim domu lub innej nieruchomości mieszkalnej już teraz, przejdź proces weryfikacji online i zacznij pozyskiwać nowych klientów. Rejestracja zajmie tylko 2 minuty.`,
      // `Wynajmij pokój w mieszkaniu na dobę w mieście ${city}, ${country}, z płatnością przed zameldowaniem. Pobieramy tylko 5% prowizji i zapewniamy elastyczne zarządzanie cenami. Zarejestruj swoje zakwaterowanie online i zdobywaj klientów. Oferuj niestandardowe ceny widoczne dla osób poszukujących rezerwacji. Nie przegap okazji, aby zaoferować dobre ceny i pozyskać klientów przy minimalnej prowizji. Zarejestruj się i zacznij wynajmować swój dom już teraz.`,
      // `Wynajmij miejsce w swoim hostelu | ${city}, ${country} — na Twoich warunkach dzięki Your Price Booking. Otrzymuj płatność przed wprowadzeniem się, a nasza prowizja wynosi tylko 5%. Zarządzaj cenami według własnego uznania i oferuj spersonalizowane oferty dla każdego klienta. Masz możliwość zobaczenia wszystkich użytkowników zainteresowanych Twoimi wolnymi miejscami i przedstawienia ofert promocyjnych. Podróżni wiedzą, że oferujemy hotelarzom minimalne prowizje i oczekujemy od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj swój hostel na naszej stronie internetowej, przejdź weryfikację online i rozpocznij sprzedaż za pośrednictwem naszego serwisu.`,
      `Wynajmij swój pokój hotelowy na swoich warunkach dzięki opcji Your Price Booking | ${city}. Otrzymuj płatność przed wprowadzeniem się, a nasza prowizja wynosi tylko 5%. Zarządzaj cenami według własnego uznania i oferuj spersonalizowane oferty dla każdego klienta. Masz możliwość zobaczenia wszystkich użytkowników zainteresowanych Twoimi dostępnymi numerami i przedstawienia ofert promocyjnych. Podróżni wiedzą, że oferujemy hotelarzom minimalne prowizje i oczekujemy od Ciebie świetnych cen. Nie mamy zasady parytetu cen, tylko elastyczność i przejrzystość. Zarejestruj swój hotel już teraz, przejdź weryfikację online i zacznij pozyskiwać nowych klientów.`,
      `Zoptymalizuj swój biznes dzięki Your Price Booking - usłudze rezerwacji hoteli wszystkich typów i mieszkań na dobowy wynajem. Z nami wynajmujesz pokoje na swoich warunkach, widzisz wszystkich użytkowników, którzy mogą skorzystać z Twoich ofert i oferujesz indywidualne, poufne ceny. Hotelarze płacą tylko 5% prowizji od każdej transakcji i mogą zmieniać ceny według własnego uznania. Nie ma parytetu cenowego – jest tylko elastyczność i przejrzystość. Zarejestruj się już teraz, przejdź weryfikację online i zdobądź nowych klientów.`,
    ],
    en: [
      // `Rent accommodation to tourists per day | ${city}, ${country}e. Get paid before registering. 5% commission, flexible prices, real estate registration online. Satisfy guests' booking needs by offering customized pricing. Attract travelers who know our host commissions are minimal. List hotels, apartments, houses, etc. today and attract customers! The best conditions for hoteliers on the online reservation service Your Price Booking.`,
      `Rent out your hotel room on your terms with Your Price Booking | ${city}. Receive payment before moving in, and our commission is only 5%. Manage prices at your discretion and offer customized offers for each client. You have the opportunity to see all users interested in your available numbers and make promotional offers. Travelers know that we offer hoteliers minimal commissions and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register your hotel right now, go through online verification and start attracting new clients.`,
      // `Rent out your capsule rooms at Capsule Hotel on your terms with Your Price Booking | ${city}. Receive payment before moving in, our commission is only 5%. You have complete control over prices and can offer customized quotes in confidence. See all users, create promotional offers for free. Travelers know we offer minimal commissions to hotels and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register your Capsule Hotel right now, go through online verification, and start attracting new clients. Registration will only take 2 minutes.`,
      // `Rent out rooms in your Guest House with Your Price Booking | ${city}, ${country} on your terms. Receive payment before moving in. Registration will take 2 minutes. Our commission is only 5%. You have complete control over prices and can offer customized quotes in confidence. See all users interested in your rental and create promotional offers. Travelers know we offer minimal commissions to hotels and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register your Guest House right now, go through online verification and start attracting new clients.`,
      // `Rent a room in your house to travelers daily - ${city}, on your terms at your booking price. Receive payment before moving in and our commission is only 5%. You have complete control over prices and can privately offer personalized offers. View all users interested in your rental and create promotional offers. Travelers know we offer minimal commissions to hotels and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register a room in your home or other residential property now, complete the online verification process and start attracting new clients. Registration will only take 2 minutes.`,
      // `Rent a room in an apartment daily in the city of ${city}, ${country}, with payment before check-in. We charge only 5% commission and provide flexible price management. Register your accommodation online and get customers. Offer custom pricing visible to those looking for a reservation. Do not miss the opportunity to offer good prices and get customers with minimal commission. Register and start renting out your home right now.`,
      // `Rent out a place in your hostel | ${city}, ${country} — on your terms with Your Price Booking. Receive payment before moving in, and our commission is only 5%. Manage prices at your discretion and offer customized offers for each client. You have the opportunity to see all users interested in your free places and make promotional offers. Travelers know that we offer hoteliers minimal commissions and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register your hostel on our website, go through online verification and start selling through our service.`,
      `Rent out your hotel room on your terms with Your Price Booking | ${city}. Receive payment before moving in, and our commission is only 5%. Manage prices at your discretion and offer customized offers for each client. You have the opportunity to see all users interested in your available numbers and make promotional offers. Travelers know that we offer hoteliers minimal commissions and expect great prices from you. We do not have the principle of price parity, only flexibility and transparency. Register your hotel right now, go through online verification and start attracting new clients.`,
      `Optimize your business with Your Price Booking - a service for booking hotels of all types and daily rental housing. With us, you rent out rooms on your terms, see all the users who are eligible for your offers, and offer individual, confidential prices. Hoteliers pay only 5% commission on each transaction and can change prices at their discretion. There is no price parity - only flexibility and transparency. Register now, go through online verification and attract new clients.`,
    ],
  };

  let isPageAdded = false;

  //   const foo = async () => {
  //     for (const link of pageCatalog.ua) {
  //       //   arrayOfLinks.push(
  //       //     `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`
  //       //   );

  //       const addToUaCatalog = await UaCatalogForHotelier.create({
  //         ...req.body,
  //         nameOfpage: district,
  //         url: `${MAIN_DOMAIN}${link}-${district}-${city}-${state}-${country}`,
  //       });

  //       if (addToUaCatalog) {
  //         return  isPageAdded = true);
  //       }
  //     }
  //   };

  //   const getString = `${district} ${city} ${state} ${country}`;
  const getString = !district
    ? `${city} ${state} ${country} ${language}`
    : `${district} ${city} ${state} ${country} ${language}`;

  const translit = cyrillicToTranslit.transform(getString, "-").toLowerCase();

  switch (language) {
    case "uk":
      for (const link of pageCatalog.uk) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.uk.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToUaCatalog = await UaCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToUaCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const uaPages = await UaCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          uaPages,
        },
      });
      break;

    case "ru":
      for (const link of pageCatalog.ru) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.ru.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToRuCatalog = await RuCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToRuCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const ruPages = await RuCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          ruPages,
        },
      });
      break;

    case "pl":
      for (const link of pageCatalog.pl) {
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.pl.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];

        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;

          const addToPlCatalog = await PlCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToPlCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const plPages = await PlCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          plPages,
        },
      });

      break;

    case "en":
      for (const link of pageCatalog.en) {
        // console.log({ link });
        // console.log("index", pageCatalog.en.indexOf(link));
        const createUrl = `${MAIN_DOMAIN}${link}-${translit}`;
        const getIndex = pageCatalog.en.indexOf(link);
        const createTypeOfPage = pageCatalog.en[getIndex];
        // console.log({ createTypeOfPage });
        const checkLinkPlCatalog = await PlCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkUACatalog = await UaCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkRuCatalog = await RuCatalogForHotelier.find({
          url: createUrl,
        });
        const checkLinkEnCatalog = await EnCatalogForHotelier.find({
          url: createUrl,
        });

        if (
          checkLinkPlCatalog.length === 0 &&
          checkLinkUACatalog.length === 0 &&
          checkLinkRuCatalog.length === 0 &&
          checkLinkEnCatalog.length === 0
        ) {
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: createUrl,
            typeOfPage: createTypeOfPage,
          });
          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        } else {
          const upgradeUrl = `${MAIN_DOMAIN}${link}-${translit}-${language}`;
          const addToEnCatalog = await EnCatalogForHotelier.create({
            ...req.body,
            nameOfpage: district,
            url: upgradeUrl,
            typeOfPage: createTypeOfPage,
          });

          if (addToEnCatalog) {
            isPageAdded = true;
          } else {
            res.status(406).json({
              status: "error",
              isAdded: false,
              message: `pages doesn't added to ${language} catalog hotelier`,
              code: 406,
            });
          }
        }
      }

      const enPages = await EnCatalogForHotelier.find({
        idLocation,
      });
      res.status(201).json({
        status: "success",
        isAdded: true,
        message: `pages added to ${language} catalog hotelier`,
        code: 201,
        data: {
          enPages,
        },
      });
      break;

    default:
      res.status(405).json({
        status: "error",
        message: `This DB doesn't has language ${language} for create pages`,
        code: 405,
      });
      break;
  }
};

module.exports = createNewPages;
