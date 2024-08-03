import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './adminDashboard.css';

const AdminDashboard = () => {
    const [dataType, setDataType] = useState('');
    const [selectedWilaya, setSelectedWilaya] = useState('');
    const [count, setCount] = useState(0);

    useEffect(() => {
        fetchData();
    }, [dataType, selectedWilaya]);

    const fetchData = async () => {
        if (dataType && selectedWilaya) {
            try {
                let url = '';

                if (dataType === 'demandeur') {
                    url = `http://localhost:8000/statistiques/demandeurs/wilaya/${selectedWilaya}`;
                } else if (dataType === 'offre') {
                    url = `http://localhost:8080/statistiques/offres/wilaya/${selectedWilaya}`;
                } else if (dataType === 'employeur') {
                    url = `http://localhost:8080/statistiques/employeurs/wilaya/${selectedWilaya}`;
                }
                const response = await axios.get(url);
                setCount(response.data);
            } catch (error) {
                console.log(error);
            }
        }else {
            setCount(0);
        }
    };

    const handleDataTypeChange = (e) => {
        setDataType(e.target.value);
        setSelectedWilaya('');
    };

    const handleWilayaChange = (e) => {
        setSelectedWilaya(e.target.value);
    };

    return (
      <div className="widget stati">
        <div className="left">
          <span>Users by Wilaya</span>
          <select value={dataType} onChange={handleDataTypeChange}>
            <option value="">Type of data</option>
            <option value="demandeur">Applicants</option>
            <option value="employeur">Employers</option>
            <option value="offre">Job offer</option>
            <option value="demande">Job application</option>
          </select>
          <select value={selectedWilaya} onChange={handleWilayaChange}>
            <option value="">wilaya</option>
            <option value="Adrar">Adrar</option>
            <option value="Chlef">Chlef</option>
            <option value="Laghouat">Laghouat</option>
            <option value="Oum El Bouaghi">Oum El Bouaghi</option>
            <option value="Batna">Batna</option>
            <option value="Béjaïa">Béjaïa</option>
            <option value="Biskra">Biskra</option>
            <option value="Béchar">Béchar</option>
            <option value="Blida">Blida</option>
            <option value="Bouira">Bouira</option>
            <option value="Tamanrasset">Tamanrasset</option>
            <option value="Tébessa">Tébessa</option>
            <option value="Tlemcen">Tlemcen</option>
            <option value="Tiaret">Tiaret</option>
            <option value="Tizi Ouzou">Tizi Ouzou</option>
            <option value="Alger">Alger</option>
            <option value="Djelfa">Djelfa</option>
            <option value="Jijel">Jijel</option>
            <option value="Sétif">Sétif</option>
            <option value="Saïda">Saïda</option>
            <option value="Skikda">Skikda</option>
            <option value="Sidi Bel Abbès">Sidi Bel Abbès</option>
            <option value="Annaba">Annaba</option>
            <option value="Guelma">Guelma</option>
            <option value="Constantine">Constantine</option>
            <option value="Médéa">Médéa</option>
            <option value="Mostaganem">Mostaganem</option>
            <option value="M'Sila">M'Sila</option>
            <option value="Mascara">Mascara</option>
            <option value="Ouargla">Ouargla</option>
            <option value="Oran">Oran</option>
            <option value="El Bayadh">El Bayadh</option>
            <option value="Illizi">Illizi</option>
            <option value="Bordj Bou Arreridj">Bordj Bou Arreridj</option>
            <option value="Boumerdès">Boumerdès</option>
            <option value="El Tarf">El Tarf</option>
            <option value="Tindouf">Tindouf</option>
            <option value="Tissemsilt">Tissemsilt</option>
            <option value="El Oued">El Oued</option>
            <option value="Khenchela">Khenchela</option>
            <option value="Souk Ahras">Souk Ahras</option>
            <option value="Tipaza">Tipaza</option>
            <option value="Mila">Mila</option>
            <option value="Aïn Defla">Aïn Defla</option>
            <option value="Naâma">Naâma</option>
            <option value="Aïn Témouchent">Aïn Témouchent</option>
            <option value="Ghardaïa">Ghardaïa</option>
            <option value="Relizane">Relizane</option>
            <option value="El M'ghair">El M'ghair</option>
            <option value="El Menia">El Menia</option>
            <option value="Ouled Djellal">Ouled Djellal</option>
            <option value="Bordj Badji Mokhtar">Bordj Badji Mokhtar</option>
            <option value="Beni Abbès">Beni Abbès</option>
            <option value="Timimoun">Timimoun</option>
            <option value="Touggourt">Touggourt</option>
            <option value="Djanet">Djanet</option>
            <option value="In Salah">In Salah</option>
            <option value="In Guezzam">In Guezzam</option>
          </select>
        </div>
        <div className="right">
          <div className="result"> {count}</div>
        </div>
      </div>
    );
};

export default AdminDashboard;
