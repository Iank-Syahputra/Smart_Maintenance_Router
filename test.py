from KlasifikasiLaporan import KlasifikasiLaporan

model = KlasifikasiLaporan("models")

hasil = model.predict(
    "AC ruang kelas mati total, panas sekali kasian kita belajar di dalam."
)

print(hasil)