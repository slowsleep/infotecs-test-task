import { useState, useEffect } from "react";
import ResizableTable from "@/components/ResizableTable/ResizableTable";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://dummyjson.com/users');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
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
      <main className="flex flex-col overflow-x-scroll lg:items-center">
        <h1 style={{width: "50px", backgroundColor: "red"}}>user table</h1>
        <ResizableTable
          className="w-full max-w-[1440px] table-auto border-collapse border border-gray-300"
          columns={['Фамилия', 'Имя', 'Отчество', 'Возраст', 'Пол', 'Номер телефона', 'Email', 'Страна', 'Город']}
          data={users}
          displayDataColumns={['lastName', 'firstName', 'maidenName', 'age', 'gender', 'phone', 'email', 'address.country', 'address.city']}
          isLoading={isLoading}
          error={error}
        />
      </main>
    </div>
  );
}
