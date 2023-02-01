const subtraction = {
  $subtract: ['$amountOfScootersAvailabile', { $size: '$scooters_id' }],
};

const projection = {
  _id: '$_id',
  address: '$address',
  amountAvailable: subtraction,
};

const caclAvailabilityStage = {
  $project: projection,
};

export const caclParkingAvailabilities = [caclAvailabilityStage];
