document.addEventListener('DOMContentLoaded', async () => {
    const userDataContainer = document.getElementById('userData');
    const apiUrl = 'https://reqres.in/api/users?delay=3';
  
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data; // Los datos reales están dentro de la propiedad 'data'
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };
  
    const displayUserData = (userData) => {
      userDataContainer.innerHTML = `
        <table class="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Nombre</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            ${userData.map(user => `
              <tr>
                <td><img src="${user.avatar}" class="rounded-circle" alt="Avatar"></td>
                <td>${user.first_name} ${user.last_name}</td>
                <td>${user.email}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      `;
    };
  
    const getData = async () => {
      const storedData = localStorage.getItem('userData');
      if (storedData) {
        const { timestamp, data } = JSON.parse(storedData);
        const currentTime = new Date().getTime();
        const elapsedTime = (currentTime - timestamp) / 1000;
  
        if (elapsedTime < 60) {
          displayUserData(data);
        } else {
          const newData = await fetchData();
          const newTimestamp = new Date().getTime();
          localStorage.setItem('userData', JSON.stringify({ timestamp: newTimestamp, data: newData }));
          displayUserData(newData);
        }
      } else {
        const newData = await fetchData();
        const timestamp = new Date().getTime();
        localStorage.setItem('userData', JSON.stringify({ timestamp, data: newData }));
        displayUserData(newData);
      }
    };
  
    getData();
  });
  