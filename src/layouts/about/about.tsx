/* eslint-disable @next/next/no-img-element */
import PDFViewer from "@/components/pdfViewer";
import { Separator } from "@/components/ui/separator";

export default function AboutLayout() {
  return (
    <>
      <div className="flex flex-col justify-center min-h-screen mx-auto container items-center">
        <h1 className="text-xl font-semibold uppercase">
          Tentang Pendidikan Jarak Jauh (PJJ)
        </h1>
        {/* Visi Misi */}
        <div className="flex flex-warp max-w-4xl gap-4 md:flex-col">
          <div className="mt-2">
            <h3 className="font-semibold">Visi</h3>
            <p className="text-justify ">
              ”Menjadi pusat unggulan pendidikan program diploma 3 melalui
              pendidikan jarak jauh (distance learning) di bidang teknologi
              informasi dalam skala nasional maupun internasional”
            </p>
          </div>
          <div className="mt-2 gap-2">
            <h3 className="font-semibold">Visi</h3>
            <p className="text-justify ">
              Dalam rangka mewujudkan Visi tersebut di atas, dan sejalan dengan
              Misi PENS yang kemudian dirumuskan menjadi Misi PS D3 PJJ TI,
              berikut ini adalah misi nya :
            </p>
            <ul className="list-disc pl-4">
              <li className="text-basemb-2">
                Menyediakan lingkungan pendidikan berpusat pada mahasiswa
                (student-centered), kualitas tinggi (high-quality), dan
                fleksibel terhadap waktu dan lokasi mahasiswa
              </li>
              <li className="text-base mb-2">
                Menyediakan sistem aplikasi pembelajaran yang mampu mengakomodir
                pendidikan jarak jauh melalui media Teknologi Informasi dan
                Komunikasi (TIK)
              </li>
              <li className="text-bas mb-2">
                Menghasilkan kualitas bahan ajar pendidikan jarak jauh
                termediasi Teknologi Informasi dan Komunikasi (TIK)
              </li>
              <li className="text-base  mb-2">
                Menyelenggarakan suatu kegiatan penelitian terapan bidang
                teknologi rekayasa Teknologi Informasi dan Komunikasi (TIK),
                serta menerapkannya kepada masyarakat dan industri.
              </li>
            </ul>
          </div>
        </div>
        {/* sertikikat */}
        <Separator className="max-w-4xl" />
        <br />
          <h1 className="text-xl font-semibold">
          SERTIFIKAT AKREDITASI PROGRAM STUDI PJJ PENS
        </h1>
        <p className="text-justify max-w-4xl mt-3">
          Berdasarkan Keputusan LAM INFOKOM No.033/SK/LAMINFOKOM/Ak/D3/III/2024 menyatakan bahwa program studi Pjj Teknik Informatika pada Program Diploma Tiga Politeknik Elektronika Negeri Surabaya, Kota Surabaya Memenuhi Syarat Peringkat “AKREDITASI UNGGUL” Sertifikat Akreditasi Program Studi ini berlaku sejak tanggal 22 Maret 2024 sampai dengan 22 Maret 2029
        </p>
        {/* Visi Misi */}
        <div className="flex flex-warp max-w-4xl gap-4 md:flex-col">
          <div className="mt-2 gap-2">
            <p className="text-justify ">
              Sertifikat Akreditasi LAM INFOKOM untuk Prodi D3 PJJ Teknik Informatika dapat di unduh di :
              <a href="https://pjj.pens.ac.id/wp-content/uploads/2019/08/Surat_Sertifikat_LAMINFOKOM_PJJ_TI.pdf" target="_blank" rel="noopener noreferrer">
                Akrerditasi LAM INFOKOM D3 PJJ TEKNIK INFORMATIKA
              </a>
            </p>
            <div className="mt-2">
              <img src="https://pjj.pens.ac.id/wp-content/uploads/2019/08/Surat_Sertifikat_LAMINFOKOM_PJJ_TI_1-768x543.png" alt="" sizes=""/>
            </div>
          </div>

            <div className="mt-2 gap-2">
            <p className="text-justify ">
             Dari hasil Assesmen Lapangan pada tanggal 19 Agustus 2019 , Program Studi D4 PJJ Teknik Telekomunikasi mendapatkan Akreditasi “B” dari BAN-PT ( Badan Akreditasi Nasional Perguruan Tinggi)
              Sertifikat Akreditasi BAN-PT untuk Prodi D4 PJJ Teknik Telekomunikasi  dapat di unduh :
              <a href="https://pjj.pens.ac.id/wp-content/uploads/2019/08/Akreditasi-D4-PJJ-Teknik-Telekomunikasi-PENS-2019-2024.pdf" target="_blank" rel="noopener noreferrer">
                Akrerditasi LAM INFOKOM D3 PJJ TEKNIK INFORMATIKA
              </a>
            </p>
            <div className="mt-2">
              <img src="https://pjj.pens.ac.id/wp-content/uploads/2019/08/Sertifikat-Akreditasi-D4-PJJ-Teknik-Telekomunikasi-PENS_2-768x543.png" alt="" sizes="" />
            </div>
          </div>
      
        </div>
        <br />
        <Separator className="max-w-4xl" />
        <br />
        {/* sertikikat */}
        <div className="flex flex-warp max-w-4xl gap-4 md:flex-col">
        {/* <PDFViewer/> */}
             <div className="mt-2 justify-center mx-auto">
            <h1 className="font-semibold uppercase text-xl">SK PROGRAM STUDI D3 PJJ TEKNIK INFORMATIKA (MENRISTEKDIKTI)</h1>
            <p className="text-justify mt-4 mb-4">
             Sehubungan dengan telah di tetapkan Keputusan Menteri Riset, Teknologi dan Pendidikan Tinggi Nomor 62/M/KPT/2017 tentang Penyelenggaraan Pendidikan Jarak Jauh pada lingkup Program Studi Teknik Informatika Program Diploma Tiga pada Politeknik Elektronika Negeri Surabaya di Surabaya, bersama ini kami sampaikan Salinan Keputusan Menteri Riset, Teknologi dan Pendidikan Tinggi untuk digunakan sebagaimana mestinya
            </p>
          </div>
        </div>
        <embed src="https://pjj.pens.ac.id/wp-content/uploads/2021/07/2017-SK-Prodi-D3-TI-PJJ.pdf" width="100%" height="" className="max-w-4xl mb-5 h-[900px] md:h-[300px]" />
      </div>
    </>
  );
}
