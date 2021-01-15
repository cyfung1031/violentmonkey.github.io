import { format } from 'date-fns';
import React, { useRef } from 'react';
import TOC from '../toc';
import Disqus from '../disqus';
import TagBlock from '../tag-block';
import Sidebar from '../sidebar';

export default function PostMain(props) {
  const {
    data: {
      markdownRemark: post,
    },
  } = props;
  const {
    frontmatter: {
      title: postTitle,
      date,
      tags,
      sidebar,
    },
    fields: {
      tagSlugs,
      type,
    },
    html,
    tableOfContents,
  } = post;

  const commentsBlock = <Disqus postNode={post} />;
  const articleRef = useRef();
  return (
    <>
      <Sidebar active={sidebar} />
      <main className="flex-1 has-toc">
        <section className="mb-10 pt-1">
          <h1>{postTitle}</h1>
        </section>
        <section className="items-start with-toc">
          <TOC data={tableOfContents} articleRef={articleRef} />
          <article className="flex-1 min-w-0 mr-4" ref={articleRef} dangerouslySetInnerHTML={{ __html: html }} />
        </section>
        <section>
          <hr />
          {type === 'posts' && (
            <div className="mb-6">
              <em>Published at {format(new Date(date), 'MMMM d, yyyy')}</em>
            </div>
          )}
          <TagBlock tags={tags} tagSlugs={tagSlugs} />
        </section>
        {commentsBlock}
      </main>
    </>
  );
}
