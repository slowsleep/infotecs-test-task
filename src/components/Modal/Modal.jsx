const Modal = ({ item, isOpen, setIsOpen, ...args }) => {
  if (!isOpen) return null;

  const onClose = () => {
    setIsOpen(false);

    const overlay = document.querySelector('.overlay');
    if (overlay) {
      overlay.style.display = 'none';
    }
  };

  return (
    <div className="modal-overlay"  onClick={onClose} style={{ display: isOpen ? 'block' : 'none' }} {...args}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <div className="modal-item-details">
          <h1>Подробная информация о пользователе:</h1>
          <p><strong>ФИО:</strong> {item.firstName} {item.lastName} {item.maidenName}</p>
          <p><strong>Возраст:</strong> {item.age}</p>
          <p><strong>Адрес:</strong></p>
          <p className="modal-address">Страна: {item.address?.country}</p>
          <p className="modal-address">Штат: {item.address?.state}</p>
          <p className="modal-address">Код штата: {item.address?.stateCode}</p>
          <p className="modal-address">Город: {item.address?.city}</p>
          <p className="modal-address">Улица: {item.address?.address}</p>
          <p className="modal-address">Почтовый индекс: {item.address?.postalCode}</p>
          <p className="modal-address">Координаты: {item.address?.coordinates.lat}, {item.address?.coordinates.lng}</p>
          <p><strong>Рост:</strong> {item.height} см</p>
          <p><strong>Вес:</strong> {item.weight} кг</p>
          <p><strong>Телефон:</strong> {item.phone}</p>
          <p><strong>Email:</strong> {item.email}</p>
          <p><strong>Аватар:</strong></p>
          <img src={item.image} alt={`${item.firstName} ${item.lastName}`} className="modal-avatar" />
        </div>
      </div>
    </div>
  );
};

export default Modal;
