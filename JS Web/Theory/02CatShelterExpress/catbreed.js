const breed = [
    {breed: 'Persian'},
    {breed: 'Unknown'},
    {breed: 'Great Britain'}
]

exports.getCatBreeds = () =>  breed;
exports.pushBreed = (breedArr, newBreedObj) => {
    breedArr.push(newBreedObj);
}
