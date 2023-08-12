import Card from "./common/card";
import amine from '../img/stock/amine.jpg'
import bianca from '../img/stock/bianca.jpg'
import quangNguyenVinh from '../img/stock/quang-nguyen-vinh.jpg'
import samKolder from '../img/stock/sam-kolder.jpg'
import tarynElliott from '../img/stock/taryn-elliott.jpg'
import vincentRivaud from '../img/stock/vincent-rivaud.jpg'

const Home = () => {
    
    const sampleText = 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate'
    const sampleTitle = 'Sample title'
    return ( 
        <div class="row row-cols-1 row-cols-md-3 g-4 mt-2">
            <div class="col">
                <Card 
                    image={amine}
                    text={sampleText}
                    alt='lorem'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
            <div class="col">
                <Card 
                    image={bianca}
                    text={sampleText}
                    alt='ipsum'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
            <div class="col">
                <Card 
                    image={quangNguyenVinh}
                    text={sampleText}
                    alt='dolor'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
            <div class="col">
                <Card 
                    image={samKolder}
                    text={sampleText}
                    alt='sit'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
            <div class="col">
                <Card 
                    image={tarynElliott}
                    text={sampleText}
                    alt='amet'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
            <div class="col">
                <Card 
                    image={vincentRivaud}
                    text={sampleText}
                    alt='elit'
                    link='/flights'
                    button='Book now'
                    title={sampleTitle}
                />
            </div>
        </div>
     );
}
 
export default Home;