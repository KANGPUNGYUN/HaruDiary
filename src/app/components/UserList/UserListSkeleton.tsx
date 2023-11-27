import Link from "next/link";
export default function UserListSkeleton() {
  return (
    <>
      <li className="p-user-list-item">
        <Link href="/">
          <div className="p-user-list-user-profile-image__outer">
            <div className="avatar-skeleton"></div>
          </div>
          <div className="p-user-list-user-profile">
            <div className="p-user-list-user-name skeleton-loader"></div>
            <div className="p-user-list-user-diarys skeleton-loader"></div>
          </div>
        </Link>
      </li>
      <li className="p-user-list-item">
        <Link href="/">
          <div className="p-user-list-user-profile-image__outer">
            <div className="avatar-skeleton"></div>
          </div>
          <div className="p-user-list-user-profile">
            <div className="p-user-list-user-name skeleton-loader"></div>
            <div className="p-user-list-user-diarys skeleton-loader"></div>
          </div>
        </Link>
      </li>
      <li className="p-user-list-item">
        <Link href="/">
          <div className="p-user-list-user-profile-image__outer">
            <div className="avatar-skeleton"></div>
          </div>
          <div className="p-user-list-user-profile">
            <div className="p-user-list-user-name skeleton-loader"></div>
            <div className="p-user-list-user-diarys skeleton-loader"></div>
          </div>
        </Link>
      </li>
      <li className="p-user-list-item">
        <Link href="/">
          <div className="p-user-list-user-profile-image__outer">
            <div className="avatar-skeleton"></div>
          </div>
          <div className="p-user-list-user-profile">
            <div className="p-user-list-user-name skeleton-loader"></div>
            <div className="p-user-list-user-diarys skeleton-loader"></div>
          </div>
        </Link>
      </li>
      <li className="p-user-list-item">
        <Link href="/">
          <div className="p-user-list-user-profile-image__outer">
            <div className="avatar-skeleton"></div>
          </div>
          <div className="p-user-list-user-profile">
            <div className="p-user-list-user-name skeleton-loader"></div>
            <div className="p-user-list-user-diarys skeleton-loader"></div>
          </div>
        </Link>
      </li>
    </>
  );
}
