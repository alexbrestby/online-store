export const getFilteredFormData = () => {
  document.getElementById('search-form')?.addEventListener('input', function () {
    const formData = new FormData(this as HTMLFormElement);
    console.log(...formData);
  });
};
