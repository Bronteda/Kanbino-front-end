const CompletedCard = ({ card}) => {
  //console.log(card);
return (
    <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 p-6 shadow-lg hover:shadow-xl transition-all">
        {card && (
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-gray-900 truncate">{card.title}</h2>
                    <span
                        className={[
                            "px-3 py-1 rounded-full text-xs font-semibold",
                            card.completed
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700",
                        ].join(" ")}
                    >
                        {card.completed ? "Completed" : "In Progress"}
                    </span>
                </div>
                <div className="text-sm text-gray-700">
                    <span className="font-medium text-gray-600">Description:</span>{" "}
                    {card.description || <span className="italic text-gray-400">No description</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                    <span className="font-medium text-gray-700">Assigned to:</span>
                    {card.assignedTo
                        ? assignedUser?.name || <span className="italic text-gray-400">Loading...</span>
                        : <span className="italic text-gray-400">Unassigned</span>}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                    <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                        Last updated: {new Date(card.updatedAt).toLocaleDateString()}
                    </span>
                </div>
            </div>
        )}
    </div>
);
};

export default CompletedCard;
