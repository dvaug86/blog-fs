import * as React from 'react';
import * as moment from 'moment';
import {useParams} from 'react-router-dom'
import type { IBlog } from '../utils/types';
import { Link } from 'react-router-dom';



const DetailsPage: React.FC<DetailsPageProps> = (props) =>{

    const {blogid} = useParams();
    const [blog, setBlog] = React.useState<IBlog | null>(null);

    React.useEffect(() =>{  
        (async () => {
            const res = await fetch (`/api/blogs/${blogid}`);
            const blog = await res.json();
            setBlog (blog)
        })();
    },[]);


    return(
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <article className="card my-2 shadow">
                        <div className="card-body">
                            <h1 className="card-text text-center">{blog?.title}</h1>
                            <h4 className="card-text text-center text-muted mb-2">
                                 written on {moment(blog?.created_at).format('MMM Do, YYYY')} by {blog?.name}
                            </h4>
                            <div className="card-text px-8 mb-5">{blog?.content.split('\n').map((para, i) => (
                            <p key={`p-block-${i}`}>{para}</p>
                            ))} 
                            {/* weDid this above with the paragraphs in order to have our paragraphs properly formatted */}
                            </div>
                            <div>
                                <Link className='btn btn-outline-secondary' to='/'>Back To Homepage</Link>
                            </div>
                        </div>
                    </article>
                </div>
            </section>
        </main>
    )
}

interface DetailsPageProps {}

export default DetailsPage;