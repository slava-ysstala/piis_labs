# piis_labs Асташко Владислава Ивановна, гр. 210901,  https://slava-ysstala.github.io/piis_labs/

# 📄 Лаба 10 — Владислава Асташко

<img src="фоточка.jpg" alt="Моё фото" width="300"/>

## <img src="фоточка.jpg" alt="Моё фото" width="300"/> О себе

Привет! Я учусь на 3 курсе и активно развиваюсь в области **веб-разработки** (как *full stack*, так и в раздельных направлениях), изучаю **UX/UI-дизайн** и хочу попробовать себя в сфере гейм-дизайна.  
В данный момент работаю над написанием своей грядущей дипломной работы.  
Я уверенный пользователь нейросетей и постоянно развиваюсь в смежных цифровых направлениях.

---

## 📇 Контакты

- **Почта:** slava.ystala@gmail.com  
- **Telegram:** [@slava_ysstala](https://t.me/slava_ysstala)  
- **GitHub:** [slava-ysstala](https://github.com/slava-ysstala)

---

## 🎓 Образование

| Годы       | Учебное заведение | Специальность                                       | Средний балл |
|------------|-------------------|----------------------------------------------------|---------------|
| 2022–2026  | БГУИР, ФКП        | Инженерно-психологическое обеспечение ИТ           | Общий: **8.58**<br>4 семестр: **9.33**, 5 семестр: **9.17** |

---

## 💼 Опыт и проекты

- 👩‍💻 Участие в хакатоне `</beStudent>` — веб-проект *«Сайт для студенческой деревни»*  
- ⚰️ Курсовой проект — *«Сайт похоронного бюро "Две гвоздики"»*  
- 🔮 Прототипирование интерфейса сайта таро-услуг *Arcanum* 
- 🏢 Веб-проект *«Контрольно-пропускная система предприятия»*  
- 📅 Текущий проект — *Ежедневник для личного и совместного планирования*

---

## 🧠 Навыки

**Языки программирования:**
- JavaScript (4)
- Java (4)
- Python (1)
- C++ (1)

**Разметка и стили:**
- HTML (4)
- CSS (4)

**Фреймворки и технологии:**
- Spring (3), Hibernate (2), Freemarker (2), React (1)
- MySQL (3)
- Maven (2)

**Инструменты и дизайн:**
- Git (3), Figma (3), Adobe Illustrator (2), Canva (3), Blender (2)

**IDE и среды разработки:**
- VS Code (5), IntelliJ IDEA (5), Android Studio (2), Visual Studio (2), PyCharm (1)

**Big Data:**
- Hadoop (1), Spark (1)

**UX/UI:**
- Диаграммы (4), анализ ЦА (4), макеты интерфейсов (4)

---

## 💬 Английский язык

**Уровень:** B1–B2  
Понимаю техническую документацию, веду переписку, читаю англоязычные статьи. Хочу улучшить разговорный уровень.

---

## 💻 Пример кода (на Java)

```java
public class BubbleSort {
    public static void bubbleSort(int[] array) {
        int n = array.length;
        boolean swapped;
        for (int i = 0; i < n - 1; i++) {
            swapped = false;
            for (int j = 0; j < n - i - 1; j++) {
                if (array[j] > array[j + 1]) {
                    int temp = array[j];
                    array[j] = array[j + 1];
                    array[j + 1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) break;
        }
    }
}
