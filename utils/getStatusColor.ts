export function getStatusColor(status: number) {
  const statusStr = `${status}`;
  if (statusStr.startsWith('1')) {
    return 'bg-blue-700 text-blue-200';
  } else if (statusStr.startsWith('2')) {
    return 'bg-green-700 text-green-200';
  } else if (statusStr.startsWith('3')) {
    return 'bg-yellow-700 text-yellow-200';
  } else if (statusStr.startsWith('4') || statusStr.startsWith('5')) {
    return 'bg-red-700 text-red-200';
  } else {
    return 'bg-gray-700 text-gray-200';
  }
}
