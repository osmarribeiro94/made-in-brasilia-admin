import { Pagination } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useEffect, useState } from "react";
import {
  CreateCities,
  DeleteCities,
  PagesHeader,
  SharedMenu,
  SharedModal,
  UpdateCities,
} from "../../components";
import { useDataControlContext } from "../../contexts/DataControlContext";
import { useApplicationControlContext } from "../../contexts/ApplicationControlContext";
import iCity from "../../dtos/iCity";
import { listAllCityRequest } from "../../services/api";
import "./cities.css";

const Cities = () => {
  const { setIsModalActive } = useApplicationControlContext();
  const { refreshCityData, selectedCity } = useDataControlContext();
  const [cities, setCities] = useState<iCity[] | []>([]);
  const [modalOption, setModalOption] = useState<number>(0);

  const refreshData = async () => {
    try {
      const response = await listAllCityRequest();
      setCities(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    refreshData();
    console.log(selectedCity);
  }, [refreshCityData]);

  return (
    <div className="cities">
      <PagesHeader />
      <div className="cities-content">
        <div className="cities-content_button">
          {/* <input className="" /> */}
          <button
            className=" gradient-bg-colorful"
            onClick={() => {
              setModalOption(1);
              setIsModalActive(true);
            }}
          >
            <span>Adicionar</span>
          </button>
        </div>
        <TableContainer>
          <Table className="cities-content-table" sx={{ minWidth: 650 }}>
            <TableHead>
              <TableRow>
                <TableCell>
                  <h3>Nome</h3>
                </TableCell>
                <TableCell>
                  <h3>Título</h3>
                </TableCell>
                <TableCell>
                  <h3>Texto</h3>
                </TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableHead>
            <TableBody>
              {cities.map((city, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <span>{city.name}</span>
                  </TableCell>
                  <TableCell>
                    <span>{city.title}</span>
                  </TableCell>
                  <TableCell>
                    <span>{city.text}</span>
                  </TableCell>
                  <TableCell />
                  <TableCell>
                    <SharedMenu city={city} setModalOption={setModalOption} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          className="pagination"
          color="primary"
          count={2}
          onChange={() => console.log(1)}
        />
      </div>
      {modalOption == 1 && <SharedModal children={<CreateCities />} />}
      {modalOption == 2 && <SharedModal children={<UpdateCities />} />}
      {modalOption == 3 && <SharedModal children={<DeleteCities />} />}
    </div>
  );
};

export default Cities;