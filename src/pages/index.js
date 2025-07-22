import { useState, useEffect } from "react";
import ResizableTable from "@/components/ResizableTable/ResizableTable";
import Modal from "@/components/Modal/Modal";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [itemToModal, setItemToModal] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          switch (response.status) {
            case 400:
              throw new Error('Неверный запрос (400)');
            case 401:
              throw new Error('Неавторизован (401)');
            case 403:
              throw new Error('Доступ запрещён (403)');
            case 404:
              throw new Error('Ресурс не найден (404)');
            case 422:
              const validationErrors = await response.json().catch(() => null);
              throw new Error(validationErrors?.message || 'Ошибка валидации (422)');
            case 500:
              throw new Error('Внутренняя ошибка сервера (500)');
            case 502:
              throw new Error('Промежуточный сервер недоступен (502 Bad Gateway)');
            case 503:
              throw new Error('Сервер недоступен (503)');
            default:
              throw new Error(`${response.status}`);
          }
        }
        const jsonData = await response.json();
        setUsers(jsonData.users);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();

  }, [])

  return (
    <div>
      <main className="flex flex-col lg:items-center">
        <h1 style={{width: "50px", backgroundColor: "red"}}>user table</h1>
        <ResizableTable
          className="w-full max-w-[1440px] table-auto border-collapse border border-gray-300"
          columns={['Фамилия', 'Имя', 'Отчество', 'Возраст', 'Пол', 'Номер телефона', 'Email', 'Страна', 'Город']}
          data={users}
          displayDataColumns={['lastName', 'firstName', 'maidenName', 'age', 'gender', 'phone', 'email', 'address.country', 'address.city']}
          isLoading={isLoading}
          error={error}
          setIsOpenModal={setIsOpenModal}
          setItemToModal={setItemToModal}
        />
      </main>
      <Modal isOpen={isOpenModal} setIsOpen={setIsOpenModal} item={itemToModal}></Modal>
      <div className="overlay"></div>
    </div>
  );
}
