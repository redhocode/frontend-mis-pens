import { Separator } from "@/components/ui/separator";

export default function AboutLayout() {
  return (
    <div className="container mx-auto p-4">
      <div className="container flex flex-col items-center mb-8">
        <h1 className="text-3xl font-bold">Tentang PJJ D3 PENS</h1>
      </div>
      
      <div className="mx-auto grid md:grid-cols-2 gap-4">
        <div className="rounded-md shadow-lg px-4 py-2">
          <h2 className="text-xl font-bold">Visi</h2>
          <p className="text-justify">
            Menjadi pusat unggulan pendidikan program diploma 3 melalui
            pendidikan jarak jauh (distance learning) di bidang teknologi
            informasi dalam skala nasional maupun internasional.
          </p>
        </div>
        
        <div className="rounded-md shadow-lg px-4 py-2">
          <h2 className="text-xl font-bold">Misi</h2>
          <ul className="list-disc ml-6">
            <li>
              Meningkatkan akses pendidikan kepada masyarakat melalui
              perangkat Teknologi Informasi dan Komunikasi (TIK).
            </li>
            <li>
              Menyediakan lingkungan pendidikan berpusat pada mahasiswa
              (student-centered), kualitas tinggi (high-quality), dan
              fleksibel terhadap waktu dan lokasi mahasiswa.
            </li>
            <li>
              Menyediakan sistem aplikasi pembelajaran yang mampu mengakomodir
              pendidikan jarak jauh melalui media Teknologi Informasi dan
              Komunikasi (TIK).
            </li>
            <li>
              Menghasilkan kualitas bahan ajar pendidikan jarak jauh termediasi
              Teknologi Informasi dan Komunikasi (TIK).
            </li>
            <li>
              Menyelenggarakan suatu kegiatan penelitian terapan bidang
              teknologi rekayasa Teknologi Informasi dan Komunikasi (TIK),
              serta menerapkannya kepada masyarakat dan industri.
            </li>
          </ul>
        </div>
      </div>
      
      <Separator className="my-8" />
      
      <div className="mx-auto mb-8">
        <h3 className="text-xl font-bold">Sertifikat PJJ D3 PENS</h3>
        <article className="text-justify">
          Berdasarkan Keputusan LAM INFOKOM No.033/SK/LAMINFOKOM/Ak/D3/III/2024 menyatakan bahwa program studi Pjj Teknik Informatika pada Program Diploma Tiga Politeknik Elektronika Negeri Surabaya, Kota Surabaya Memenuhi Syarat Peringkat “AKREDITASI UNGGUL” Sertifikat Akreditasi Program Studi ini berlaku sejak tanggal 22 Maret 2024 sampai dengan 22 Maret 2029
        </article>
      </div>
      
      <div className="mx-auto grid md:grid-cols-2 gap-4">
        <div className="rounded-md shadow-lg px-4 py-2">
          <h3 className="text-lg font-bold">D3 PJJ Teknik Informatika PENS:</h3>
          <p className="text-justify">
            Membekali mahasiswa dengan kemampuan mengembangkan dan memelihara
            sistem informasi berbasis komputer pada lingkungan bisnis dan
            manufaktur. Kompetensi prodi ini meliputi: Basis data, Sistem
            Informasi, Rekayasa Perangkat Lunak, jaringan komputer dan
            multimedia.
          </p>
        </div>
        
        <div className="rounded-md shadow-lg px-4 py-2">
          <h3 className="text-lg font-bold">Prodi PJJ PENS menganut sistem hybrid yaitu:</h3>
          <ul className="list-disc ml-6">
            <li>
              Proses pembelajaran secara daring: Mata kuliah teori dan praktikum dilaksanakan 14X (empat kali) selama satu semester (sesuai jadwal pembelajaran) di Kampus PENS bersama dengan dosen PENS pada hari Jum’at malam sampai hari Minggu. Dan 2X ujian UTS & UAS untuk Kuliah Teori dan Pre-Test & Post-Test untuk Kuliah Praktek.
            </li>
            <li>
              Proses pembelajaran di Pusat Belajar Jarak Jauh (PBJJ): Mata kuliah teori dilaksanakan 14X (empat belas kali) termediasi online <a href="http://ethol.pens.ac.id"> http://ethol.pens.ac.id</a>, Mahasiswa di kampus PBJJ dan Dosen di kampus PENS. Mata kuliah praktikum dilaksanakan 14X (empat belas kali) tatap muka dengan tutor PBJJ. Untuk mahasiswa PJJ Teknik Informatika yang berdomisili di kota yang tidak ada PBJJ, mahasiswa bisa melakukan kuliah teori/praktikum online darimana saja.
            </li>
            <li>
              Pada waktu diluar tatap muka, mahasiswa belajar secara mandiri melalui sarana Teknologi Informasi dan Komunikasi (TIK) melalui elearning<a href="http://ethol.pens.ac.id"> http://ethol.pens.ac.id</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
