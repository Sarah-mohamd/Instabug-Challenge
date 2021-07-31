# Categories endpoints tests

## Retrieve Categories tests
- [x]  Retrieve all categories paginated
- [x]  Retrieve category by using a specific Filters (name)
- [x]  Check empty response by entering an not found category name
- [x]  Check empty response by entering an empty name
- [x]  Retrieve a specific category by id
- [x]  Get NotFound error when tries to get a category by invalid id

## Create category tests

- [x]  Create a category by entering a valid name and id
- [x]  Get error message when trying to create a category with e isting id
- [x]  Get an error message when trying to create a category without id

## Edit a category tests

- [x]  Edit id and name of a category by entering a valid name and id
- [x]  Get error message when trying to update a category without entering id
- [x]  Get error message when trying to update a category with invalid id

## Delete a category tests

- [x]  Delete a category by entering a valid id
- [x]  Get an Error message when tries to delete a category that already deleted before