/*
    const [formData, setFormData] = useState({
        name: '',
        breed: '',
        price: '',
        age: '',
        description: '',
        image: ''
        })

    function handleChange(e){
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]:value
        })
    }

    function handleSubmit(e){
        e.preventDefault();
        
        const { name, breed, price, age, description, image } = formData

        setFormData({
            name: '',
            breed: '',
            price: '',
            age: '',
            description: '',
            image: ''
            })

            fetch('/dogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: name,
                    breed: breed,
                    price: parseInt(price),
                    age: age,
                    description: description,
                    image: image,
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                console.log('New dog data:', data);
                return setDogList([...dogList, data])
    
            })
            .catch(error => {
                console.error('Error adding new dog:', error);
            });
    }
    */