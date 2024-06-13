import React from "react";


function MyFavorites(){

    ```
    fetch("/favorites")
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok')
            }
            return response.json();
          })
          .then(data => console.log(data))
          .catch(error => console.error('Error fetching favorites:', error));
      }
    ```

    return(
        <div>
            <h1>My Favorites</h1>
        </div>
    );
}

export default MyFavorites;