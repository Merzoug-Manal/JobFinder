const { Producer, KafkaClient }= require('kafka-node')

let client = new KafkaClient({ kafkaHost: process.env.KAFKA_BROKER_ADDRESS });
let producer = new Producer(client);


const checkConnection = async () => {
    producer.on("ready", () => {
      console.log("kafka borker established successfully!!");
    });
    producer.on("error", (error) => {
      console.log( error);
    });
  };

  

const sendMessages = async (topic, data) => {
  try {
    await producer.connect();
    console.log('Connected to Kafka broker');
    //const message = {value: JSON.stringify(data)}
    
   console.log(data);
    
    
   const payloads = [{ topic: topic, messages: data }];
     producer.send(payloads, function (error, data) {
       if (error) {
         console.error('Failed to send message:', error);
       } else {
         console.log('Sent message:', data);
       }
     });
    // await producer.send({
    //   topic,
    //   messages: [JSON.stringify(message)]
    // });
    // console.log(`Message sent successfully to topic "${topic}"`);
  } 
  
  catch (error) {
    console.error(error);
  } 

};


// const kafka = require('kafka-node');

// const client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' });
// const producer = new kafka.Producer(client);

// producer.on('ready', function () {
//   const message = [
//     { value: "{\r\n            idJobSeeker: demandeur.id,\r\n            firstName: nom,\r\n            lastName: prenom,\r\n            phone,\r\n            dateNaissance,\r\n            PlaceNaissance,\r\n            addresse,\r\n            genre,\r\n         \r\n          }" },
  
//   ];
//   const payloads = [{ topic: 'creation-demandeur', messages: [JSON.stringify(message)] }];
//   producer.send(payloads, function (error, data) {
//     if (error) {
//       console.error('Failed to send message:', error);
//     } else {
//       console.log('Sent message:', data);
//     }
//   });
// });


module.exports = { checkConnection, sendMessages };
