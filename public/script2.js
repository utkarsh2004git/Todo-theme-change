document.addEventListener('DOMContentLoaded', (event) => {
    const checkbox = document.getElementById('checkbox');
    const exampleDiv = document.querySelector('.whole-body');
    const toggleLabel = document.querySelector('.toggle-label');
    const toggleBall = document.querySelector('.toggle-ball');
    const heading = document.querySelectorAll('.heading');
    const bgs=document.querySelectorAll(".bgs")


    const setBackgroundColor = (isChecked) => {
        exampleDiv.classList.remove('bg-gradient-to-b', 'from-gray-900', 'to-gray-800', 'from-gray-300', 'to-gray-200');
        toggleLabel.classList.remove('bg-gray-900', 'bg-gray-400')
        toggleBall.classList.remove('bg-white','bg-gray-900')
        heading.forEach(h=>{
            h.classList.remove('border-gray-400','text-white','border-gray-900','text-black')
            if (isChecked) {
                h.classList.add('border-gray-400','text-white')
            }
            else{
                h.classList.add('border-gray-900','text-black')
            }
        })
        bgs.forEach(b=>{
            b.classList.remove('bg-white','bg-gray-200','text-white','text-black')
            if (isChecked) {
                b.classList.add('bg-white')
            }
            else{
                b.classList.add('bg-gray-200')
            }
        })


        //dark
        if (isChecked) {
            
            toggleLabel.classList.add('bg-gray-900')
            toggleBall.classList.add('bg-white')
            exampleDiv.classList.add('bg-gradient-to-b', 'from-gray-900', 'to-gray-800');
        }
        
        //light
        
        else {
            
            toggleBall.classList.add('bg-gray-900')
            toggleLabel.classList.add('bg-gray-400')
            exampleDiv.classList.add('bg-gradient-to-b', 'from-gray-300', 'to-gray-200');
        }
    };

    // Add event listener for change event
    checkbox.addEventListener('change', (event) => {
        const isChecked = event.target.checked;
        console.log('Checkbox is checked:', isChecked);
        setBackgroundColor(isChecked);
    });

    // Set the initial state of the background color
    const initialCheckedState = checkbox.checked;
    console.log('Initial checkbox state:', initialCheckedState);
    setBackgroundColor(initialCheckedState);
});
