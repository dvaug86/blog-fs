import * as React from 'react';
import {useNavigate} from 'react-router-dom'

const ComposePage: React.FC<ComposePageProps> = (props) => {
    const history =useNavigate();
    
    const [title, setTitle] = React.useState('');
    const [content, setContent] = React.useState('');

    const handleSubmit = async(e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        console.log({title, content})
        const res = await fetch('/api/blogs', {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({title, content})
        });
        const result = await res.json();
        console.log(result);
        history(`/details/${result.id}`);
    }

    return (
        <main className="container">
            <section className="row">
                <div className="col-12">
                    <form  className="form-group p-3">
                        {/* go back and make sure padding and margins at end */}

                        <label htmlFor="title">Title</label>
                        <input
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            type="text" 
                            className="form-control form-control-lg mb-2"
                            placeholder='Title'
                            // a controlled react input like above needs to have a value and onChange in this case the state of title 
                        />
                        <label htmlFor="content">Content</label>
                        <textarea
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            rows={20}
                            className="form-control form-control-lg mb-2"
                            placeholder='Place your Blog content'
                        />
                        <div className="d-flex justify-content-end">
                            <button onClick={handleSubmit} className="btn btn-primary btn-lg mt-3">Submit!</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

interface ComposePageProps { }

export default ComposePage;