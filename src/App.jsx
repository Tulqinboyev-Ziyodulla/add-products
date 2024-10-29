import './App.css';
import { useAddProductsMutation, useGetAllProductsQuery, useDeleteProductMutation, useUpdateProductMutation } from './store/productsApi';
import { useState } from 'react';
import Modal from './store/Modal'; // Modal komponentini import qilish

function App() {
  const { data = [] } = useGetAllProductsQuery();
  const [addProduct] = useAddProductsMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal ochilish holati
  const [action, setAction] = useState(null); // Harakat turi (o'chirish yoki yangilash)

  function handleSubmit(e) {
    e.preventDefault();
    const newProduct = {
      title: e.target.title.value,
    };
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, title: newProduct.title });
      setEditingProduct(null);
    } else {
      addProduct(newProduct);
    }
    e.target.reset();
  }

  function handleDelete(id) {
    setEditingProduct(data.find(item => item.id === id)); // Tahrirlanadigan mahsulotni o'rnatish
    setAction('delete'); // O'chirish harakatini belgilash
    setIsModalOpen(true); // Modalni ochish
  }

  function handleEdit(product) {
    setEditingProduct(product);
    setAction('edit'); // Tahrirlash harakatini belgilash
    setIsModalOpen(true); // Modalni ochish
  }

  function confirmDelete() {
    if (editingProduct) {
      deleteProduct(editingProduct.id); // Mahsulotni o'chirish
    }
    setIsModalOpen(false); // Modalni yopish
  }

  function confirmEdit(newTitle) {
    if (editingProduct) {
      updateProduct({ id: editingProduct.id, title: newTitle }); // Mahsulotni yangilash
    }
    setIsModalOpen(false); // Modalni yopish
  }

  return (
    <div className='flex flex-col items-center p-5 bg-gradient-to-r from-blue-500 to-purple-500 min-h-screen'>
      <h1 className='text-3xl font-bold text-white mb-4'>Mahsulotlar Ro'yxati</h1>
      <form onSubmit={handleSubmit} className='mb-5 w-full max-w-sm'>
  <input
    name='title'
    className='p-2 w-full rounded-md border-2 border-white focus:outline-none focus:border-yellow-400'
    type="text"
    placeholder={!editingProduct ? 'Product name...' : ''}
    defaultValue={editingProduct ? editingProduct.title : ''}
  />
  <button className='mt-2 w-full p-2 bg-yellow-400 rounded-md hover:bg-yellow-300 transition duration-300 ease-in-out'>
    {editingProduct ? 'Yangilash' : 'Add'}
  </button>
</form>
      <ul className='w-full max-w-md bg-white rounded-lg shadow-lg p-5'>
        {data.map(item => (
          <li key={item.id} className='flex justify-between items-center border-b border-gray-200 py-2'>
            <input
              type="text"
              value={item.title}
              readOnly
              className='flex-1 p-2 rounded-md border-2 border-gray-300 bg-blue-50 focus:outline-none focus:border-blue-400 mr-2'
            />
            <div>
              <button
                onClick={() => handleEdit(item)}
                className='bg-blue-500 text-white hover:bg-blue-600 transition duration-300 rounded-md px-4 py-2 mr-2'
              >
                Update
              </button>
              <button
                onClick={() => handleDelete(item.id)}
                className='bg-red-500 text-white hover:bg-red-600 transition duration-300 rounded-md px-4 py-2'
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>


      {/* Modal komponenti */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={action === 'delete' ? confirmDelete : confirmEdit} // Harakatga qarab tasdiqlash
        title={action === 'delete' ? "O'chirish tasdiqlash" : "Mahsulotni tahrirlash"}
        message={action === 'delete' ? `Siz "${editingProduct?.title}" mahsulotini o'chirishni xohlaysizmi?` : "Yangi nomni kiriting:"}
        initialTitle={editingProduct ? editingProduct.title : ''} // Modalga dastlabki nom
      />
    </div>
  );
}

export default App;
