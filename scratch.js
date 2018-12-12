function mapStateToProps(state, ownProps) {
  const stateHobbies = Object.assign([], state.hobbies)
  let checkBoxHobbies = [];
  let catHobbies = [];
  let cat = {name: '', breed: '', weight: '', temperament: '', hobby_ids: []};
  const catId = ownProps.params.id;
  if (catId && state.cats.length > 0 && state.hobbies.length > 0) {
    cat = getCatById(state.cats, ownProps.params.id);
    if (cat.hobby_ids.length > 0) {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies, cat);
      catHobbies = collectCatHobbies(stateHobbies, cat);
    } else {
      checkBoxHobbies = hobbiesForCheckBoxes(stateHobbies)
    }
  }
    return {cat: cat, checkBoxHobbies: checkBoxHobbies, catHobbies: catHobbies};
}
