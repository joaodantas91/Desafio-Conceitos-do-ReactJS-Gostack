import React, { useState } from "react";

import "./styles.css";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "ReactJS",
      owner: "João Dantas"
    });

    const repository = response.data;

    setRepositories([...repositories,repository])

  }

  async function handleRemoveRepository(id) {
    console.log(id)
    const response = await api.delete(`repositories/${id}`)

    const noDeleted = repositories.filter((repository) => repository.id !== id);

    setRepositories(noDeleted)
    
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => 
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
