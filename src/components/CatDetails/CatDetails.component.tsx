import * as React from 'react';
import './CatDetails.css';
import { getCats } from '../../services/cats.service';
import { useParams } from 'react-router-dom';

export default function CatDetails() {
  const params = useParams()
  const [cat, setCat]: any = React.useState({});

  React.useEffect(() => {
    const data: any = localStorage.getItem('cats') || [];
    const cats: any = JSON.parse(data);
    const currentSelectedCat = cats.find((catData: any) => {
      return catData.id === params?.id
    });

    if (currentSelectedCat) {
      setCat(currentSelectedCat)
    }
  }, [])

  return (
    <div className='cat-details-container'>
      <div className='inner-container'>
        <img src={cat?.image?.url} className='cat-image' />
        <div className='text-container'>
          <span className='text-title'>
            Name:
          </span>
          <span className='text-value'>
            {
              cat?.name
            }
          </span>
        </div>
        <div className='text-container'>
          <span className='text-title'>
            Origin:
          </span>
          <span className='text-value'>
            {
              cat?.origin
            }
          </span>
        </div>
        <div className='text-container'>
          <span className='text-title'>
            Weight:
          </span>
          <span className='text-value'>
            {
              cat?.weight?.metric
            }
          </span>
        </div>
        <div className='text-container'>
          <span className='text-title'>
            Hairless:
          </span>
          <span className='text-value'>
            {
              cat?.hairless
            }
          </span>
        </div>
        <div className='text-container'>
          <span className='text-title'>
            Wikipedia Url:
          </span>
          <span className='text-value'>
            <a target="_blank" href={cat?.wikipedia_url}>{cat?.wikipedia_url}</a>
          </span>
        </div>
        
      </div>
    </div>
  );
}