import React, { useState, useRef } from "react";

const AddTransaction = (props) => {
  // Format Tanggal dd/mm/yyyy
  const getDate = () => {
    let dateObj = new Date();

    // Tampilan Tanggal 2 Digit
    let date = dateObj.getDate().toString().padStart(2, "0");

    // Menambahkan Nilai Untuk Bulan
    let month = (dateObj.getMonth() + 1).toString().padStart(2, "0");

    return `${date}/${month}/${dateObj.getFullYear()}`;
  };

  const [formInput, setFormInput] = useState({
    tanggal: getDate(),
    keterangan: "",
    nominal: "",
  });

  const [errors, setErrors] = useState({
    tanggal: "",
    keterangan: "",
    nominal: "",
  });

  const formValid = useRef(true);

  const handleInputChange = (event) => {
    setFormInput({ ...formInput, [event.target.name]: event.target.value });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // console.log('tezt')
    // props.onTambahTransaction({});
    let pesanErrors = {
      tanggal: "",
      keterangan: "",
      nominal: "",
    };

    // Validasi Tanggal
    if (formInput.tanggal.trim() === "") {
      pesanErrors.tanggal = "Tanggal Tidak Boleh Kosong";
    } else if (!/^[0-3][0-9]\/[0-1][0-9]\/[0-9]{4}$/.test(formInput.tanggal)) {
      pesanErrors.tanggal = "Format Tanggal Tidak Sesuai";
    }

    // Validasi Keterangan
    if (formInput.keterangan.trim() === "") {
      pesanErrors.keterangan = "Keterangan Wajib Diisi";
    }

    // Validasi Nominal
    if (formInput.nominal.trim() === "") {
      pesanErrors.nominal = "Nominal Wajib Diisi";
    } else if (!/^[+|-]?\d+$/.test(formInput.nominal)) {
      pesanErrors.nominal = "Nominal Wajib Berupa Angka";
    }

    // Update Pesan Error
    setErrors(pesanErrors);

    // Cek Validasi Seluruh Form
    let isFormValid = true;
    for (let inputName in pesanErrors) {
      if (pesanErrors[inputName].length > 0) {
        isFormValid = false;
        break;
      }
    }
    formValid.current = isFormValid;

    // Proses Data Saat Valid
    if (formValid.current) {
      let tanggalInput = new Date();
      tanggalInput.setDate(parseInt(formInput.tanggal.substring(0, 2)));
      tanggalInput.setMonth(parseInt(formInput.tanggal.substring(3, 5)) - 1);
      tanggalInput.setFullYear(parseInt(formInput.tanggal.substring(6, 10)));

      props.onTambahTransaction ({
        id: Math.floor(Math.random() * 1232).toString(),
        tanggal: tanggalInput.getTime(),
        keterangan: formInput.keterangan,
        nominal: parseInt(formInput.nominal),
      });

      // Kosongkan Form
      setFormInput({
        tanggal: getDate(),
        keterangan: "",
        nominal: "",
      });
    }
  };

  return (
    <section id="add-transaction">
      <div className="container py-5">
        <h2 className="fw-light mb-3 text-center">TambahTransaksi</h2>
        <hr className="w-75 mx-auto mb-4" />
        {!formValid.current && (
          <div className="row">
            <div className="col-12 col-lg-6 error-boxmy-2">
              <ul className="py-3">
                {errors.tanggal && <li> {errors.tanggal}</li>}
                {errors.keterangan && <li>{errors.keterangan}</li>}
                {errors.nominal && <li>{errors.nominal}</li>}
              </ul>
            </div>
          </div>
        )}
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            <div className="col-12 col-md-3 col-lg-2 mb-3">
              <label htmlFor="tanggal" className="form-label">
                Tanggal
              </label>
              <input
                type="text"
                id="tanggal"
                name="tanggal"
                placeholder="dd/mm/yyy"
                className={`form-control ${errors.tanggal && "is-invalid"}`}
                value={formInput.tanggal}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-6 col-lg-5 mb-3">
              <label htmlFor="Keterangan" className="form-label">
                Keterangan
              </label>
              <input
                type="text"
                id="keterangan"
                name="keterangan"
                placeholder="BayarCicilan"
                className={`form-control ${errors.keterangan && "is-invalid"}`}
                value={formInput.keterangan}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-md-3 col-lg-3 mb-3">
              <label htmlFor="nominal" className="form-label">
                Nominal* (+/-)
              </label>
              <input
                type="text"
                id="nominal"
                name="nominal"
                placeholder="-150000"
                className={`form-control ${errors.nominal && "is-invalid"}`}
                value={formInput.nominal}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-2 mb-3 d-flex align-items-end">
              <button type="submit" className="btn btn-primary flex-fill">
                Tambah
              </button>
            </div>
          </div>
          <p>
            <small>
              *Jika diisi angka negatif, akan tercatat di pengeluaran
            </small>
          </p>
        </form>
      </div>
    </section>
  );
};
export default AddTransaction;
