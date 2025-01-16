'use client';
import styles from './cookies.module.scss';

const Cookies = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Политика в отношении файлов cookie</h1>
      <section className={styles.section}>
        <p className={styles.paragraph}>
          Сервис «A-JOB.RU» (далее – Сервис) использует технические и
          маркетинговые cookie, в том числе cookie партнеров (третьих лиц -
          поставщиков услуг) для того, чтобы предоставлять пользователям
          определенные возможности для просмотра и использования страниц сайта.
          Некоторые из них позволяют проверять качество работы и улучшать
          рабочие характеристики сайта, чтобы сделать его более удобным для
          Пользователя.
        </p>
        <p className={styles.paragraph}>
          Cookie — это небольшой файл, создаваемый сайтом и хранящийся локально
          в интернет-браузере или файловой системе пользовательского компьютера
          или мобильного устройства.
        </p>
        <p className={styles.paragraph}>
          Большинство интернет-браузеров настроены принимать cookie
          автоматически. При этом Пользователь может самостоятельно изменить
          настройки своего браузера – отключить или ограничить использование
          cookie, получать уведомления об их использовании.
        </p>
        <p className={styles.paragraph}>
          Если Пользователь пользуется различными устройствами (планшетом,
          смартфоном, компьютером и т. д.), он должен убедится, что на каждом
          пользовательском устройстве браузер настроен в соответствии с
          пользовательским решением по использованию файлов cookie.
        </p>
        <p className={styles.paragraph}>
          Продолжая просмотр страниц Сервиса, Пользователь принимает условия
          «Политики в отношении файлов cookie» (далее - Политика), а также
          соглашается с передачей полученных с помощью cookie данных о нем
          третьим лицам и получением рекламы.
        </p>
        <p className={styles.paragraph}>
          Если Пользователь не принимает условия Политики, он может
          заблокировать cookie (все или отдельные), выбрав соответствующую опцию
          в используемом браузере, или прекратить просмотр страниц Сервиса.
        </p>
        <p className={styles.paragraph}>
          Следует обратить внимание, что отключение cookie - файлов может
          повлиять на функциональность сайта, и некоторые функции могут стать
          недоступными.
        </p>
        <p className={styles.paragraph}>
          Информация об отдельных видах используемых Сервисом cookie:
        </p>
        <p className={styles.paragraph}>
          Функциональные cookie: обеспечивают работу ключевых функций сайта,
          таких как сохранение настроек пользователя, авторизация и доступ к
          учетной записи.
        </p>
        <p className={styles.paragraph}>
          Аналитические cookie: помогают нам анализировать, как пользователи
          взаимодействуют с сайтом, чтобы улучшить его функциональность и
          пользовательский интерфейс.
        </p>
        <p className={styles.paragraph}>
          Администрация сайта использует сервисы, которые позволяют
          анализировать активность посетителей сайта и улучшать его работу. Эти
          сервисы получают данные на анонимной основе и не собирают сведения о
          личности посетителя сайта, не идентифицируют его как физическое лицо
          (не устанавливают личность).
        </p>
        <p className={styles.paragraph}>
          Полученные сведения могут быть использованы Сервисом, как владельцем
          сайта, наряду со сторонними организациями для предоставления рекламной
          информации Пользователю и для улучшения работы сайта и его разделов.
          Для уточнения информации, как используют cookie упомянутые сторонние
          сервисы, Пользователю необходимо ознакомится с их политиками
          конфиденциальности.
        </p>
        <p className={styles.paragraph}>
          Перечень используемых нами сторонних сервисов cookie:
        </p>
        <ul className={`${styles.paragraph} ${styles.paragraph_links}`}>
          <li className={`${styles.paragraph} ${styles.item}`}>
            <a
              className={`${styles.paragraph} ${styles.paragraph_link}`}
              href="https://yandex.ru/legal/metrica_termsofuse/"
              target="_blank"
            >
              Яндекс.Метрика и AppMetrica
            </a>
          </li>
        </ul>
        <p className={styles.paragraph}>
          Рекламные cookie: используются для показа персонализированной рекламы
          на основе интересов пользователя и его взаимодействия с контентом
          сайта.
        </p>
        <p className={styles.paragraph}>
          Cookie для социальных сетей: используются для интеграции с платформами
          социальных сетей и для возможности делиться контентом через такие
          платформы.
        </p>
        <p className={styles.paragraph}>
          Пользователи могут настроить параметры браузера для управления cookie
          -файлами или отключения их сохранения. Инструкции по отключению cookie
          -файлов можно найти в документации к используемому браузеру:
        </p>
        <p className={styles.paragraph}>
          Google Chrome: Перейдите в "Настройки" → "Конфиденциальность и
          безопасность" → "Файлы cookie и другие данные сайтов".
        </p>
        <p className={styles.paragraph}>
          Mozilla Firefox: Перейдите в "Настройки" → "Приватность и
          безопасность" → "Файлы cookie и данные сайтов".
        </p>
        <p className={styles.paragraph}>
          Microsoft Edge: Перейдите в "Настройки" → "Конфиденциальность и
          безопасность" → "Файлы cookie и разрешения сайта".
        </p>
        <p className={styles.paragraph}>
          Safari: Перейдите в "Настройки" → "Конфиденциальность" → "Файлы cookie
          и данные веб-сайтов".
        </p>
        <p className={styles.paragraph}>
          Yandex Browser: Перейдите в "Настройки" → "Сайты" → "Расширенные
          настройки сайтов" → "Файлы cookie и данные веб-сайтов".
        </p>
        <p className={`${styles.paragraph} ${styles.paragraph_margin}`}>
          Продолжая использовать сайт, пользователь соглашается на использование
          cookie - файлов в соответствии с данным разделом. Если пользователь не
          согласен с использованием cookie - файлов, он может изменить настройки
          браузера, чтобы ограничить или отключить их использование.
        </p>
      </section>
    </div>
  );
};

export default Cookies;