import React from 'react';
import Locon from './Locon';


const endpoint = "http://localhost:4000/";
const client = new ApolloClient({
    uri: endpoint,
    cache: new InMemoryCache()
  });
  
  const DEVICE_QUERY = gql`
  {
    combo(deviceIds: [1,2,3,4,5,6]) {
      device_id
      comboDevice {
        device_id
        firstname
        lastname
      }
      comboUser {
        user_id
        username
        password
      }
    } 
  }
  `;
  

const DeviceDataList = () => {
    const { data, isLoading, error } = useQuery("launches", () => {
        return fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: DEVICE_QUERY })
        })
          .then((response) => {
            if (response.status >= 400) {
              throw new Error("Error fetching data");
            } else {
              console.log(response);
              return response.json();
            }
          })
          .then((data) => data.data);
      });

  return (
    data
  );
};

export default DeviceDataList;