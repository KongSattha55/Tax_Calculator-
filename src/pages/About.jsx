import './Page.css'

export default function About() {
  return (
    <div className="page">
      <p className="page__eyebrow">អំពីកម្មវិធី</p>
      <h1 className="page__title">អំពីម៉ាស៊ីនគណនាពន្ធ</h1>
      <p className="page__subtitle">
        កម្មវិធីនេះបង្កើតឡើងសម្រាប់ជំនួយការសិក្សា និងការប៉ាន់ស្មានពន្ធ ដោយផ្អែកលើឯកសារយោងពន្ធដារកម្ពុជា។
      </p>

      <section className="about-section">
        <h2>ឯកសារយោង</h2>
        <ul>
          <li>
            <a href="/docs/Tax_01_Overview.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារទី ០១</strong> - ទិដ្ឋភាពទូទៅ</a>
            <div className="about-section__km" lang="km">ការចាត់ថ្នាក់អ្នកជាប់ពន្ធ ការផាកពិន័យ និងការដោះស្រាយវិវាទ។</div>
          </li>
          <li>
            <a href="/docs/Tax_02_Salary.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារទី ០២</strong> - ពន្ធលើប្រាក់បៀវត្ស</a>
            <div className="about-section__km" lang="km">អត្រាពន្ធ ការកាត់បន្ថយ ច្បាប់សម្រាប់អនិវាសនជន និងអត្ថប្រយោជន៍បន្ថែម។</div>
          </li>
          <li>
            <a href="/docs/Tax_03_Prepayment.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារទី ០៣</strong> - ពន្ធបង់ប្រាក់រំដោះ</a>
            <div className="about-section__km" lang="km">ពន្ធ ១% ប្រចាំខែលើប្រាក់ចំណូល និងការដាក់ប្រកាសតាមទម្រង់ ពត ០១។</div>
          </li>
          <li>
            <a href="/docs/Tax_05_WithholdingTax.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារទី ០៥</strong> - ពន្ធកាត់ទុក</a>
            <div className="about-section__km" lang="km">អត្រាពន្ធកាត់ទុកសម្រាប់និវាសនជន និងអនិវាសនជន។</div>
          </li>
          <li>
            <a href="/docs/Tax_06_IncomeTax.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារទី ០៦</strong> - ពន្ធលើប្រាក់ចំណូល</a>
            <div className="about-section__km" lang="km">ពន្ធប្រចាំឆ្នាំ តារាងអត្រាកើន និងការប្រៀបធៀបពន្ធអប្បបរមា។</div>
          </li>
          <li>
            <a href="/docs/VAT.pdf" target="_blank" rel="noopener noreferrer"><strong>ឯកសារអាករ</strong> - អាករលើតម្លៃបន្ថែម</a>
            <div className="about-section__km" lang="km">វិសាលភាពអាករលើតម្លៃបន្ថែម ឥណទានអាករធាតុចូល/ចេញ និងគោលការណ៍ដាក់ប្រកាស។</div>
          </li>
        </ul>
      </section>

      <section className="about-section">
        <h2>ប្រភេទពន្ធដែលគាំទ្រ</h2>
        <ul>
          <li><strong>ពន្ធលើប្រាក់បៀវត្ស</strong> - គណនាពន្ធសម្រាប់និវាសនជន និងអនិវាសនជន។</li>
          <li><strong>ពន្ធបង់ប្រាក់រំដោះ</strong> - គណនា ១% លើប្រាក់ចំណូលប្រចាំខែមិនរួមអាករលើតម្លៃបន្ថែម។</li>
          <li><strong>អាករលើតម្លៃបន្ថែម</strong> - គណនា ១០% ពីចំនួនមុនអាករ ឬចំនួនរួមអាកររួច។</li>
          <li><strong>ពន្ធលើអត្ថប្រយោជន៍បន្ថែម</strong> - គណនា ២០% លើអត្ថប្រយោជន៍បន្ថែមជាប់ពន្ធ។</li>
          <li><strong>ពន្ធកាត់ទុក</strong> - គណនាពន្ធកាត់ទុកតាមប្រភេទការទូទាត់។</li>
          <li><strong>ពន្ធលើប្រាក់ចំណូល</strong> - ប៉ាន់ស្មានពន្ធប្រចាំឆ្នាំតាមប្រភេទអ្នកជាប់ពន្ធ។</li>
          <li><strong>ពន្ធអប្បបរមា</strong> - ប្រៀបធៀបពន្ធអប្បបរមា ១% ជាមួយពន្ធលើប្រាក់ចំណូល។</li>
          <li><strong>ពិន័យ និងការប្រាក់</strong> - ប៉ាន់ស្មានពិន័យ ការប្រាក់ និងចំនួនសរុបត្រូវបង់។</li>
          <li><strong>ពន្ធជាក់លាក់</strong> - គណនាពន្ធជាក់លាក់លើ ស្រា បារី យានយន្ត ទូរគមនាគមន៍ និងទំនិញ/សេវាកម្មជាក់លាក់។</li>
          <li><strong>ពន្ធលើអចលនទ្រព្យ</strong> - គណនាពន្ធប្រចាំឆ្នាំ ០.១% លើដី អាគារ និងសំណង់ ដោយ ១០០ លានរៀលដំបូងត្រូវបានលើកលែង។</li>
          <li><strong>ពន្ធចំណេញពីទ្រព្យ</strong> - គណនាពន្ធ ២០% លើប្រាក់ចំណេញពីការចាត់ចែងអចលនទ្រព្យ ឬហ៊ុន (ចូលជាធរមាន ២០២៤)។</li>
        </ul>
      </section>

      <section className="about-section">
        <h2>សេចក្តីជូនដំណឹង</h2>
        <p>
          លទ្ធផលគណនាគឺជាការប៉ាន់ស្មានប៉ុណ្ណោះ។ សម្រាប់ការដាក់ប្រកាសពន្ធផ្លូវការ សូមពិគ្រោះជាមួយភ្នាក់ងារពន្ធដារ
          ឬអគ្គនាយកដ្ឋានពន្ធដារកម្ពុជា។
        </p>
      </section>
    </div>
  )
}
