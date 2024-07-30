'use client';

import { useEffect, useRef, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { useLocale } from 'next-intl';

import { formatDate, getExcerpt } from '@utils/helpers';

type EntryCardProps = {
  createdAt: Date;
  updatedAt: Date;
  content: string;
  color: string;
};

function EntryCard({ createdAt, updatedAt, content, color }: EntryCardProps) {
  const [creationDate, setCreationDate] = useState<string>('');
  const [updatedDate, setUpdatedDate] = useState<string>('');
  const cardRef = useRef<HTMLDivElement>(null);
  const locale = useLocale();

  useEffect(() => {
    setCreationDate(formatDate(new Date(createdAt), locale as UserLocale));
    setUpdatedDate(formatDate(new Date(updatedAt), locale as UserLocale));
  }, [createdAt, updatedAt, locale]);

  return (
    <div
      className="card text-primary-content relative bg-white shadow-md"
      data-testid="entryCard"
      ref={cardRef}
    >
      <div className="card-body text-black">
        <div
          className="absolute right-4 top-4 ml-auto h-2 w-2 rounded"
          style={{ backgroundColor: color }}
        />
        <h2 className="card-title overflow-hidden">{getExcerpt(content)}</h2>
        <div className="flex justify-between">
          <div className="flex flex-col 2xl:flex-row">
            <small className="flex items-center text-[12px] 2xl:mr-3">
              <IoDocumentTextOutline /> <span className="pl-1">{creationDate}</span>
            </small>
            {updatedDate !== creationDate && (
              <small className="flex items-center text-[12px]">
                <FiEdit /> <span className="pl-1">{updatedDate}</span>
              </small>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EntryCard;
